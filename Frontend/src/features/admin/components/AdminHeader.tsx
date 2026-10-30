type AdminHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-6">
      <div className="min-w-0">
        <h1 className="break-words font-[family-name:var(--font-instrument-serif)] text-[30px] leading-tight text-[#1a1a1a] sm:text-[36px]">
          {title}
        </h1>
        {description && (
        <p className="mt-2 text-[13px] text-[#605a54] sm:text-[14px]">{description}</p>
        )}
      </div>
      {action && <div className="max-w-full shrink-0">{action}</div>}
    </div>
  );
}
