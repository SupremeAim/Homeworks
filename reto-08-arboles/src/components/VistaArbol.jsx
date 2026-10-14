import Tree from "react-d3-tree";

export default function VistaArbol({ datos }) {
  if (datos === null) {
    return <p>Inserta un número para empezar el árbol.</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        background: "#ffffff",
        border: "1px solid #999999",
        color: "#111111",
      }}
    >
      <Tree
        data={datos}
        orientation="vertical"
        translate={{ x: 300, y: 60 }}
        nodeSize={{ x: 120, y: 100 }}
        pathFunc="straight"
        collapsible={false}
      />
    </div>
  );
}