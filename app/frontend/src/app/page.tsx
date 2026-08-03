import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockApplications, mockMatches, mockProfile } from "@/lib/mock-data";

export default function DashboardPage() {
  const stats = [
    { label: "Vagas analisadas", value: mockMatches.length },
    {
      label: "Candidaturas prontas",
      value: mockApplications.filter((a) => a.status === "draft_ready").length,
    },
    {
      label: "Em entrevista",
      value: mockApplications.filter((a) => a.status === "interviewing").length,
    },
    { label: "Campos por preencher", value: mockProfile.missingFields.length },
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Vista geral do agente. Dados de exemplo — liga ao backend para dados reais.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-semibold">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockProfile.missingFields.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4 text-sm text-amber-800">
            <strong>Perfil incompleto:</strong> {mockProfile.missingFields.join(", ")}. O Matching
            Agent não deve inferir estes dados — completa-os em{" "}
            <a href="/profile" className="underline">
              Perfil
            </a>
            .
          </CardContent>
        </Card>
      )}
    </div>
  );
}
