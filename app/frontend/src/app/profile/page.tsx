import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProfile } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Perfil</h1>
        <p className="text-sm text-slate-500">
          Base usada pelo Career Agent e Matching Agent. Campos em falta não são inferidos.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Senioridade</CardTitle>
        </CardHeader>
        <CardContent>{mockProfile.seniority}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competências principais</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {mockProfile.topSkills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cargos-alvo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {mockProfile.targetRoles.map((role) => (
            <Badge key={role}>{role}</Badge>
          ))}
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-700">Campos por preencher</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {mockProfile.missingFields.map((field) => (
            <Badge key={field} variant="warning">
              {field}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
