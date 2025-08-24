import { useState } from "react";
import axios from "axios";
import { ProdutoSemID } from "../inteface/produtos";
import "../ComponentsCss/upload_arquivos.css";

export const UploadArquivos: React.FC = () => {
  const [items, setItems] = useState<ProdutoSemID[]>([]);
  const [pick, setPick] = useState<Record<number, boolean>>({});
  const [outcome, setOutcome] = useState<Record<number, string>>({});

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) { setItems([]); setPick({}); setOutcome({}); return; }
    if (!f.name.toLowerCase().endsWith(".csv")) {
      alert("Extensão de arquivo inválida");
      e.target.value = "";
      setItems([]); setPick({}); setOutcome({});
      return;
    }
    const r = new FileReader();
    r.onload = () => { setOutcome({}); setPick({}); setItems(parseCSV(String(r.result || ""))); };
    r.readAsText(f);
  }

  async function enviar() {
    const sel = items.map((_, i) => (pick[i] ? i : -1)).filter(i => i >= 0);
    for (const i of sel) {
      try {
        await axios.post("http://localhost:3001/api/product", items[i]);
        setOutcome(o => ({ ...o, [i]: "Criado com sucesso" }));
      } catch {
        setOutcome(o => ({ ...o, [i]: "Falha ao criar" }));
      }
    }
  }

  return (
    <div className="upload">
      <h2>Importar produtos (.csv)</h2>

      <div className="toolbar">
        <input type="file" accept=".csv" onChange={onFile} />
        <button onClick={enviar} disabled={items.length === 0}>Enviar</button>
      </div>

      <div className="list">
        {items.map((p, i) => (
          <section key={i} className="card">
            {p.pictureUrl && <img src={p.pictureUrl} alt={p.name} />}
            <div className="info">
              <h3>{p.name}</h3>
              <p>{p.category}</p>
              <p>R$ {p.price}</p>
              <p>{p.description}</p>
            </div>
            <div className="side">
              <label>
                <input
                  type="checkbox"
                  checked={!!pick[i]}
                  onChange={() => setPick(s => ({ ...s, [i]: !s[i] }))}
                />{" "}
                Selecionar
              </label>

              {outcome[i] && (
                <div>
                  {outcome[i]}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

function parseCSV(t: string): ProdutoSemID[] {
  const lines = t.split(/\r?\n/).filter(l => l.trim() !== "");
  if (!lines.length) return [];
  const d = lines[0].includes(";") ? ";" : ",";
  const h = lines[0].split(d).map(s => s.trim().toLowerCase());
  const pos = {
    n: h.indexOf("name"),
    dsc: h.indexOf("description"),
    pr: h.indexOf("price"),
    c: h.indexOf("category"),
    u: h.indexOf("pictureurl"),
  };
  const hasHeader = Object.values(pos).every(v => v >= 0);

  return lines.slice(1).map(l => {
    const a = l.split(d);
    const [name, description, price, category, pictureUrl] = hasHeader
      ? [a[pos.n] || "", a[pos.dsc] || "", a[pos.pr] || "0", a[pos.c] || "", a[pos.u] || ""]
      : [a[0] || "", a[1] || "", a[2] || "0", a[3] || "", a[4] || ""];
    return {
      name: name.trim(),
      description: description.trim(),
      price: Number(String(price).replace(",", ".")),
      category: category.trim(),
      pictureUrl: String(pictureUrl).trim(),
    };
  });
}