import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockMatches } from "@/lib/mock-data";

export default function JobsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Vagas</h1>
        <p className="text-sm text-slate-500">
          Resultado do Matching Agent, ordenado por score de compatibilidade.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {mockMatches.map((match) => (
          <Card key={match.job.id}>
            <CardContent className="flex flex-col gap-2 pt-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium">{match.job.title}</h2>
                  <p className="text-sm text-slate-500">
                    {match.job.company} · {match.job.location} · fonte: {match.job.source}
                  </p>
                </div>
                <Badge variant={match.score >= 70 ? "success" : "warning"}>
                  score {match.score}
                </Badge>
              </div>
              <p className="text-sm text-slate-700">{match.explanation}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {match.pros.map((pro) => (
                  <Badge key={pro} variant="success">
                    + {pro}
                  </Badge>
                ))}
                {match.cons.map((con) => (
                  <Badge key={con} variant="warning">
                    − {con}
                  </Badge>
                ))}
              </div>
              {match.estimatedSalary && (
                <p className="text-xs text-slate-400">Salário estimado: {match.estimatedSalary}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
