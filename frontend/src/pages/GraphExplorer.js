import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import dagre from "dagre";

import "reactflow/dist/style.css";

import MainLayout from "../layouts/MainLayout";
import { getGraphData } from "../services/graphService";

import "./GraphExplorer.css";

const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 220;
const nodeHeight = 70;

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({
    rankdir: "TB",
    ranksep: 180,
    nodesep: 140,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(
      edge.source,
      edge.target
    );
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const position = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
      style: {
        width: nodeWidth,
        height: nodeHeight,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
};

const GraphExplorer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchGraph();
  }, []);

  const fetchGraph = async () => {
    try {
      const response =
        await getGraphData();

      const {
        nodes: layoutedNodes,
        edges: layoutedEdges,
      } = getLayoutedElements(
        response.data.data.nodes,
        response.data.data.edges
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="graph-loading">
          <div className="graph-loader"></div>
          <h2>Loading Graph...</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="graph-page">
        <h1>Network Graph Explorer</h1>

        <div className="graph-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            fitViewOptions={{
              padding: 0.5,
            }}
            defaultViewport={{
              x: 0,
              y: 0,
              zoom: 0.8,
            }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </MainLayout>
  );
};

export default GraphExplorer;