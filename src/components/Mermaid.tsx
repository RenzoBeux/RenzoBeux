import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

interface Props {
  chart: string;
}

let initialized = false;

export default function Mermaid({ chart }: Props) {
  const reactId = useId();
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        fontFamily: "inherit",
      });
      initialized = true;
    }

    const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
    mermaid.render(id, chart).then((result) => setSvg(result.svg));
  }, [chart, reactId]);

  return (
    <div
      className="mermaid-diagram my-6 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
