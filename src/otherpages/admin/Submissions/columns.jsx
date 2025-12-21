import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const getStageVariant = (stage) => {
  switch (stage) {
    case "IDEA":
      return "secondary";
    case "PROTOTYPE":
      return "default";
    case "EARLY_CUSTOMERS":
      return "outline";
    case "REVENUE":
      return "success";
    default:
      return "default";
  }
};

const getStageLabel = (stage) => {
  return stage.replace(/_/g, " ");
};

export const columns = [
  {
    accessorKey: "name",
    header: "Founder",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-gray-600">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Startup Title",
    cell: ({ row }) => {
      return (
        <div className="font-medium max-w-xs truncate">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "currentStage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("currentStage");
      return (
        <Badge variant={getStageVariant(stage)}>{getStageLabel(stage)}</Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Submitted",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-sm text-gray-600">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const submission = row.original;

      return (
        <Button variant="ghost" size="sm" asChild className="h-8 px-3">
          <Link
            to={`/admin/submissions/${submission.id}`}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View
          </Link>
        </Button>
      );
    },
  },
];
