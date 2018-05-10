<template>
  <div>

  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3'
import _ from 'lodash'
import clapi from '../clarizen/clapi.js'

export default {
  name: 'ProjectStructure',
  methods: {
    getProjectStructure (projectID) {
      var vm = this
      clapi.get('data/query?q=SELECT%20@Name,%20TrackStatus.Name,%20ProjectManager.Name,%20PercentCompleted%20FROM%20Project%20WHERE%20Project%20=%20"' + projectID + '"'
      ).then(response => {
        var project = response.data.entities[0]
        return vm.getSubProjects(project)
      }).catch(error => {
        console.log(error)
      })
    },
    getSubProjects (project) {
      console.log(project.Name)
      var vm = this
      clapi.get('data/query?q=SELECT%20@Name,%20TrackStatus.Name,%20ProjectManager.Name,%20PercentCompleted%20FROM%20Project%20WHERE%20ParentProject%20=%20"' + project.id + '"'
      ).then(response => {
        project['subprojects'] = response.data.entities
        if (_.isEmpty(project.subprojects)) {
          return project
        } else {
          project.subprojects.forEach(function (subproject) {
            subproject = vm.getSubProjects(subproject)
          })
          return project
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    var vm = this

    d3.json(vm.getProjectStructure('/Project/4y2kbmxpcbobq7sdukv9wcco2901'), function (data) { 
      // Set the dimensions and margins of the diagram
      var margin = {top: 20, right: 90, bottom: 30, left: 90},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("body").append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate("
                + margin.left + "," + margin.top + ")");

      var i = 0,
          duration = 750,
          root;

      // declares a tree layout and assigns the size
      var treemap = d3.tree().size([height, width]);

      // Assigns parent, subprojects, height, depth
      root = d3.hierarchy(data, function(d) { return d.subprojects; });
      root.x0 = height / 2;
      root.y0 = 0;

      // Collapse after the second level
      root.subprojects.forEach(collapse);

      update(root);

      // Collapse the node and all it's subprojects
      function collapse(d) {
        if(d.subprojects) {
          d._subprojects = d.subprojects
          d._subprojects.forEach(collapse)
          d.subprojects = null
        }
      }

      function update(source) {

        // Assigns the x and y position for the nodes
        var treeData = treemap(root);

        // Compute the new tree layout.
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function(d){ d.y = d.depth * 180});

        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = svg.selectAll('g.node')
            .data(nodes, function(d) {return d.id || (d.id = ++i); });

        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d) {
              return "translate(" + source.y0 + "," + source.x0 + ")";
          })
          .on('click', click);

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d) {
                return d._subprojects ? "lightsteelblue" : "#fff";
            });

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.subprojects || d._subprojects ? -13 : 13;
            })
            .attr("text-anchor", function(d) {
                return d.subprojects || d._subprojects ? "end" : "start";
            })
            .text(function(d) { return d.data.name; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
          .duration(duration)
          .attr("transform", function(d) { 
              return "translate(" + d.y + "," + d.x + ")";
          });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
          .attr('r', 10)
          .style("fill", function(d) {
              return d._subprojects ? "lightsteelblue" : "#fff";
          })
          .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
          .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
          .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, function(d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d){
              var o = {x: source.x0, y: source.y0}
              return diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function(d){ return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d) {
              var o = {x: source.x, y: source.y}
              return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function(d){
          d.x0 = d.x;
          d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

          path = `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`

          return path
        }

        // Toggle subprojects on click.
        function click(d) {
          if (d.subprojects) {
              d._subprojects = d.subprojects;
              d.subprojects = null;
            } else {
              d.subprojects = d._subprojects;
              d._subprojects = null;
            }
          update(d);
        }
      }
    })
  }
}
</script>
