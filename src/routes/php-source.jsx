import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Download, Terminal } from "lucide-react";
import { phpProject, allPhpFiles } from "@/data/php-project";
import PageHero from "@/components/PageHero";
import VivaNotes from "@/components/VivaNotes";

export const Route = createFileRoute("/php-source")({
  head: () => ({
    meta: [
      { title: "PHP Source Code | Mirchi" },
      {
        name: "description",
        content:
          "Every file of the PHP version of the Mirchi restaurant website, ready to copy into your own project.",
      },
    ],
  }),
  component: PhpSourcePage,
});

function PhpSourcePage() {
  const [activePath, setActivePath] = useState(allPhpFiles[0].path);
  const [copied, setCopied] = useState(false);

  const active = allPhpFiles.find((file) => file.path === activePath) ?? allPhpFiles[0];

  const copy = async () => {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = () => {
    const blob = new Blob([active.code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = active.path.split("/").pop();
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHero
        eyebrow="Lab submission"
        title="PHP Source Code"
        text="The same restaurant, written in plain HTML, CSS, JavaScript and PHP. Copy each file into the folder shown, then run it locally."
      />

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex flex-wrap items-start gap-4 rounded-3xl border border-border bg-card p-6">
          <Terminal className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-base font-semibold">How to run it</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Recreate the folder structure exactly, then from the project folder run:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-xs text-foreground">
              php -S 0.0.0.0:8000
            </pre>
            <p className="mt-3 text-xs text-muted-foreground">
              Open http://localhost:8000 in a browser. No database, no composer, no npm needed.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          {/* ---------- FILE LIST ---------- */}
          <nav aria-label="Project files" className="space-y-6">
            {phpProject.map((section) => (
              <div key={section.group}>
                <p className="mb-2 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                  {section.group}
                </p>
                <ul className="space-y-1">
                  {section.files.map((file) => (
                    <li key={file.path}>
                      <button
                        type="button"
                        onClick={() => setActivePath(file.path)}
                        className={`w-full truncate rounded-lg px-3 py-2 text-left font-mono text-xs transition-colors ${
                          activePath === file.path
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {file.path}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* ---------- CODE PANEL ---------- */}
          <div className="min-w-0 rounded-3xl border border-border bg-card">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-sm font-semibold text-foreground">{active.path}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{active.note}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>

            <pre className="max-h-[560px] overflow-auto px-5 py-4 font-mono text-xs leading-relaxed text-foreground">
              <code className="whitespace-pre">{active.code}</code>
            </pre>
          </div>
        </div>
      </section>

      <VivaNotes />
    </>
  );
}