import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockApplications } from "@/lib/mock-data";
import type { ApplicationStatus } from "@/types/domain";

const columns: { status: ApplicationStatus; label: string }[] = [
  { status: "draft_ready", label: "Pronta a rever" },
  { status: "submitted", label: "Submetida" },
  { status: "interviewing", label: "Entrevista" },
  { status: "offer", label: "Proposta" },
  { status: "rejected", label: "Rejeitada" },
];

export default function PipelinePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Pipeline de candidaturas</h1>
        <p className="text-sm text-slate-500">
          O Apply Agent prepara candidaturas até &quot;Pronta a rever&quot; — o envio é sempre
          confirmado manualmente aqui.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {columns.map((col) => (
          <div key={col.status} className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold uppercase text-slate-500">{col.label}</h2>
            {mockApplications
              .filter((app) => app.status === col.status)
              .map((app) => (
                <Card key={app.id}>
                  <CardContent className="pt-3 text-sm">
                    <p className="font-medium">{app.job.title}</p>
                    <p className="text-slate-500">{app.job.company}</p>
                    {col.status === "draft_ready" && (
                      <Badge variant="warning" className="mt-2">
                        aguarda confirmação humana
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
