import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedPath } from "@/lib/i18n";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { locale } = useLocale();
  
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol 
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link 
            to={getLocalizedPath('/', locale)}
            itemProp="item"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        
        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            <ChevronRight className="h-4 w-4" />
            {item.path ? (
              <>
                <Link
                  to={getLocalizedPath(item.path, locale)}
                  itemProp="item"
                  className="hover:text-primary transition-colors"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
                <meta itemProp="position" content={String(index + 2)} />
              </>
            ) : (
              <>
                <span itemProp="name" className="text-foreground font-medium">
                  {item.label}
                </span>
                <meta itemProp="position" content={String(index + 2)} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
