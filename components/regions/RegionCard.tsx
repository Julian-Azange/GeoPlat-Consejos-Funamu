import { Region } from "@/types";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderGit2, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function RegionCard({ region }: { region: Region }) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-muted bg-card">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={region.imageUrl}
          alt={region.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground backdrop-blur-md">
          {region.municipalitiesCount} Municipios
        </Badge>
        <div className="absolute bottom-4 left-4 text-white">
          <CardTitle className="text-xl font-bold">{region.name}</CardTitle>
        </div>
      </div>
      <CardContent className="pt-6">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {region.description}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <FolderGit2 className="h-4 w-4 text-primary" />
            <span className="font-medium">{region.projectsCount}</span>
            <span className="text-muted-foreground">Proyectos</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-medium">{region.indicatorsCount}</span>
            <span className="text-muted-foreground">Indicadores</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 pt-4">
        <Link href={`/regiones/${region.slug}`} className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-between group/btn")}>
          Explorar Región
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
