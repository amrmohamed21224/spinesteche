import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useSubmitContact } from "../../lib/query/hooks";
import { useTranslation } from "../../i18n";
import { setBodyScrollLocked } from "../../lib/motion";

const inputClass =
  "w-full bg-surface-container-lowest border border-outline-variant/35 rounded-xl px-4 py-3.5 text-on-surface shadow-sm placeholder:text-on-surface-variant/55 focus:outline-none focus:ring-2 focus:ring-secondary/35 focus:border-secondary/70 focus:shadow-md transition-all duration-200";

const selectClass =
  "consultation-select w-full bg-surface-container-lowest border border-outline-variant/35 rounded-xl py-3.5 text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/35 focus:border-secondary/70 focus:shadow-md transition-all duration-200 cursor-pointer";

type ConsultationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ServiceKey = "customDev" | "erp" | "ai" | "consulting" | "integration" | "mobile" | "other";

const SERVICE_KEYS: ServiceKey[] = [
  "customDev",
  "erp",
  "ai",
  "consulting",
  "integration",
  "mobile",
  "other",
];

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  const { t, locale, dir } = useTranslation();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceKey[]>([]);
  const [step1Data, setStep1Data] = useState<Record<string, string>>({});

  const contactMutation = useSubmitContact();

  useEffect(() => {
    setBodyScrollLocked(open);
    return () => setBodyScrollLocked(false);
  }, [open]);

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => {
        setStep(1);
        setSubmitted(false);
        setErrorMsg(null);
        setServices([]);
        setStep1Data({});
      }, 300);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  const toggleService = (key: ServiceKey) => {
    setServices((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const buildMessage = (fd: FormData) => {
    const lines = [
      `[${t("consultation.messageTag")}]`,
      "",
      `${t("consultation.jobTitle")}: ${step1Data.role || "—"}`,
      `${t("consultation.companySize")}: ${t(`consultation.size.${step1Data.companySize}`)}`,
      `${t("consultation.sector")}: ${t(`consultation.sectorOption.${step1Data.sector}`)}`,
      `${t("consultation.servicesInterest")}: ${
        services.length
          ? services.map((s) => t(`consultation.service.${s}`)).join(locale === "ar" ? "، " : ", ")
          : "—"
      }`,
      `${t("consultation.budget")}: ${t(`consultation.budgetOption.${fd.get("budget")}`)}`,
      `${t("consultation.timeline")}: ${t(`consultation.timelineOption.${fd.get("timeline")}`)}`,
      `${t("consultation.contactMethod")}: ${t(`consultation.contactOption.${fd.get("contactMethod")}`)}`,
      `${t("consultation.preferredTime")}: ${t(`consultation.timeOption.${fd.get("preferredTime")}`)}`,
      `${t("consultation.hearAbout")}: ${t(`consultation.sourceOption.${fd.get("source")}`)}`,
      "",
      `${t("consultation.projectDetails")}:`,
      fd.get("message"),
    ];
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const name = step1Data.name?.trim();
    const email = step1Data.email?.trim();
    const phone = step1Data.phone?.trim();
    const company = step1Data.company?.trim();
    const message = (fd.get("message") as string)?.trim();

    if (!name || !email || !phone || !message) {
      setErrorMsg(t("consultation.fillRequired"));
      return;
    }

    if (services.length === 0) {
      setErrorMsg(t("consultation.selectService"));
      return;
    }

    contactMutation.mutate(
      {
        name,
        email,
        phone,
        company,
        message: buildMessage(fd),
        source: "consultation",
        locale,
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: (error: unknown) => {
          const msg = (error as Record<string, string> | null)?.message;
          setErrorMsg(msg || t("consultation.submitError"));
        },
      },
    );
  };

  const goNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("name") || !fd.get("email") || !fd.get("phone")) {
      setErrorMsg(t("consultation.fillStep1"));
      return;
    }
    setStep1Data({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      role: String(fd.get("role") ?? ""),
      companySize: String(fd.get("companySize") ?? "11-50"),
      sector: String(fd.get("sector") ?? "private"),
    });
    setErrorMsg(null);
    setStep(2);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          <Dialog.Overlay className="consultation-overlay pointer-events-auto absolute inset-0 bg-primary/65 backdrop-blur-md" />
          <Dialog.Content
            dir={dir}
            className="consultation-content consultation-form pointer-events-auto relative z-10 flex w-full max-w-[920px] h-[min(92vh,780px)] max-h-[min(92vh,780px)] flex-col outline-none overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 border border-outline-variant/25 bg-surface"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">{t("consultation.title")}</Dialog.Title>

            {submitted ? (
              <SuccessView onClose={() => onOpenChange(false)} />
            ) : (
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
                {/* Brand panel */}
                <aside className="relative hidden lg:flex lg:w-[38%] flex-col justify-between p-8 xl:p-10 bg-primary-container text-on-primary overflow-hidden shrink-0">
                  <div
                    className="absolute inset-0 opacity-[0.07] islamic-pattern pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -top-24 -end-24 w-64 h-64 rounded-full bg-secondary/30 blur-3xl"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-16 -start-16 w-48 h-48 rounded-full bg-tertiary-fixed/20 blur-2xl"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-secondary/20 text-secondary-container text-label-md font-medium mb-6">
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        verified
                      </span>
                      {t("consultation.badge")}
                    </span>
                    <h2 className="font-headline-xl text-headline-xl font-bold leading-snug mb-4">
                      {t("consultation.asideTitle")}
                    </h2>
                    <p className="text-on-primary/80 font-body-md leading-relaxed">
                      {t("consultation.asideSubtitle")}
                    </p>
                  </div>

                  <ul className="relative z-10 space-y-4 mt-8">
                    {(["benefit1", "benefit2", "benefit3"] as const).map((key) => (
                      <li key={key} className="flex items-start gap-3">
                        <span
                          className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/25 text-secondary-container"
                          aria-hidden="true"
                        >
                          <span className="material-symbols-outlined text-lg">check</span>
                        </span>
                        <span className="text-sm leading-relaxed text-on-primary/90">
                          {t(`consultation.${key}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-10 mt-8 pt-6 border-t border-on-primary/15 flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-secondary-container text-2xl"
                      aria-hidden="true"
                    >
                      schedule
                    </span>
                    <div>
                      <p className="text-xs text-on-primary/60">
                        {t("consultation.responseLabel")}
                      </p>
                      <p className="font-semibold text-secondary-container">
                        {t("consultation.responseTime")}
                      </p>
                    </div>
                  </div>
                </aside>

                {/* Form panel */}
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface">
                  {/* Mobile header strip */}
                  <div className="lg:hidden relative px-5 pt-5 pb-4 bg-primary-container text-on-primary shrink-0">
                    <div
                      className="absolute inset-0 opacity-[0.06] islamic-pattern"
                      aria-hidden="true"
                    />
                    <p className="relative text-label-md text-secondary-container font-medium mb-1">
                      {t("consultation.badge")}
                    </p>
                    <p className="relative font-headline-sm font-bold">{t("consultation.title")}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 px-5 sm:px-8 pt-5 sm:pt-6 shrink-0">
                    <div className="flex-1 min-w-0">
                      <p className="hidden lg:block font-headline-lg text-headline-lg text-primary font-bold truncate">
                        {t("consultation.title")}
                      </p>
                      <p className="text-label-md text-on-surface-variant mt-0.5">
                        {step === 1 ? t("consultation.step1Hint") : t("consultation.step2Hint")}
                      </p>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="size-10 shrink-0 inline-flex items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                        aria-label={t("consultation.close")}
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">
                          close
                        </span>
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Progress */}
                  <div className="px-5 sm:px-8 pt-4 shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      <StepDot active={step >= 1} done={step > 1} label="1" />
                      <div
                        className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${step > 1 ? "bg-secondary" : "bg-outline-variant/30"}`}
                      />
                      <StepDot active={step >= 2} done={false} label="2" />
                    </div>
                    <div className="flex justify-between text-caption text-on-surface-variant">
                      <span>{t("consultation.step1Label")}</span>
                      <span>{t("consultation.step2Label")}</span>
                    </div>
                  </div>

                  <form
                    onSubmit={step === 1 ? goNext : handleSubmit}
                    className="flex flex-col flex-1 min-h-0"
                  >
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />
                    <div
                      className="consultation-modal-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 py-5"
                      data-lenis-prevent
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                    >
                      {errorMsg && (
                        <div
                          role="alert"
                          className="mb-5 p-4 bg-error-container/15 text-error rounded-xl text-body-md font-medium border border-error/20"
                        >
                          {errorMsg}
                        </div>
                      )}

                      <div key={step} className="consultation-step-panel space-y-5">
                        {step === 1 ? (
                          <StepOneFields
                            inputClass={inputClass}
                            selectClass={selectClass}
                            defaults={step1Data}
                          />
                        ) : (
                          <StepTwoFields
                            inputClass={inputClass}
                            selectClass={selectClass}
                            services={services}
                            onToggleService={toggleService}
                          />
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 px-5 sm:px-8 py-4 sm:py-5 border-t border-outline-variant/20 bg-surface-container-lowest/80 flex flex-col-reverse sm:flex-row gap-3">
                      {step === 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            setErrorMsg(null);
                            setStep(1);
                          }}
                          className="sm:flex-1 py-3.5 px-6 rounded-xl border border-outline-variant/50 text-on-surface font-semibold hover:bg-surface-container transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                        >
                          {t("consultation.back")}
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className={`${step === 2 ? "sm:flex-[2]" : "w-full"} py-3.5 px-6 rounded-xl bg-secondary text-on-secondary font-bold hover:bg-secondary/90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:opacity-60 flex items-center justify-center gap-2`}
                      >
                        {contactMutation.isPending
                          ? t("common.sending")
                          : step === 1
                            ? t("consultation.next")
                            : t("consultation.submit")}
                        <span
                          className={`material-symbols-outlined text-lg ${locale === "ar" ? "scale-x-[-1]" : ""}`}
                          aria-hidden="true"
                        >
                          {step === 1 ? "arrow_forward" : "send"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <span
      className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
        done
          ? "bg-secondary text-on-secondary"
          : active
            ? "bg-secondary/15 text-secondary ring-2 ring-secondary"
            : "bg-surface-container text-on-surface-variant"
      }`}
    >
      {done ? (
        <span className="material-symbols-outlined text-sm" aria-hidden="true">
          check
        </span>
      ) : (
        label
      )}
    </span>
  );
}

function SelectField({
  name,
  defaultValue,
  children,
  className,
}: {
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className="relative group">
      <select name={name} className={className} defaultValue={defaultValue}>
        {children}
      </select>
      <span className="consultation-select-chevron" aria-hidden="true">
        <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-focus-within:rotate-180">
          expand_more
        </span>
      </span>
    </div>
  );
}

function StepOneFields({
  inputClass,
  selectClass,
  defaults,
}: {
  inputClass: string;
  selectClass: string;
  defaults: Record<string, string>;
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("consultation.fullName")} required>
          <input
            name="name"
            required
            defaultValue={defaults.name}
            className={inputClass}
            placeholder={t("consultation.namePlaceholder")}
            autoComplete="name"
          />
        </Field>
        <Field label={t("consultation.email")} required>
          <input
            name="email"
            type="email"
            required
            defaultValue={defaults.email}
            className={inputClass}
            placeholder="name@company.com"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("consultation.phone")} required>
          <input
            name="phone"
            type="tel"
            required
            defaultValue={defaults.phone}
            className={inputClass}
            placeholder={t("consultation.phonePlaceholder")}
            autoComplete="tel"
            dir="ltr"
          />
        </Field>
        <Field label={t("consultation.company")}>
          <input
            name="company"
            defaultValue={defaults.company}
            className={inputClass}
            placeholder={t("consultation.companyPlaceholder")}
            autoComplete="organization"
          />
        </Field>
      </div>

      <Field label={t("consultation.jobTitle")}>
        <input
          name="role"
          defaultValue={defaults.role}
          className={inputClass}
          placeholder={t("consultation.rolePlaceholder")}
          autoComplete="organization-title"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("consultation.companySize")}>
          <SelectField
            name="companySize"
            className={selectClass}
            defaultValue={defaults.companySize || "11-50"}
          >
            <option value="1-10">{t("consultation.size.1-10")}</option>
            <option value="11-50">{t("consultation.size.11-50")}</option>
            <option value="51-200">{t("consultation.size.51-200")}</option>
            <option value="200+">{t("consultation.size.200+")}</option>
          </SelectField>
        </Field>
        <Field label={t("consultation.sector")}>
          <SelectField
            name="sector"
            className={selectClass}
            defaultValue={defaults.sector || "private"}
          >
            <option value="gov">{t("consultation.sectorOption.gov")}</option>
            <option value="health">{t("consultation.sectorOption.health")}</option>
            <option value="finance">{t("consultation.sectorOption.finance")}</option>
            <option value="retail">{t("consultation.sectorOption.retail")}</option>
            <option value="industrial">{t("consultation.sectorOption.industrial")}</option>
            <option value="private">{t("consultation.sectorOption.private")}</option>
            <option value="other">{t("consultation.sectorOption.other")}</option>
          </SelectField>
        </Field>
      </div>
    </>
  );
}

function StepTwoFields({
  inputClass,
  selectClass,
  services,
  onToggleService,
}: {
  inputClass: string;
  selectClass: string;
  services: ServiceKey[];
  onToggleService: (key: ServiceKey) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <p className="font-label-md text-label-md text-on-surface-variant mb-3">
          {t("consultation.servicesInterest")} <span className="text-error">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {SERVICE_KEYS.map((key) => {
            const selected = services.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => onToggleService(key)}
                className={`inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full text-sm font-medium border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                  selected
                    ? "bg-secondary text-on-secondary border-secondary shadow-sm"
                    : "bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:border-secondary/40 hover:text-secondary"
                }`}
              >
                {selected && (
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    check
                  </span>
                )}
                {t(`consultation.service.${key}`)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("consultation.budget")}>
          <SelectField name="budget" className={selectClass} defaultValue="50-150k">
            <option value="under50k">{t("consultation.budgetOption.under50k")}</option>
            <option value="50-150k">{t("consultation.budgetOption.50-150k")}</option>
            <option value="150-500k">{t("consultation.budgetOption.150-500k")}</option>
            <option value="500k+">{t("consultation.budgetOption.500k+")}</option>
            <option value="undecided">{t("consultation.budgetOption.undecided")}</option>
          </SelectField>
        </Field>
        <Field label={t("consultation.timeline")}>
          <SelectField name="timeline" className={selectClass} defaultValue="1-3mo">
            <option value="urgent">{t("consultation.timelineOption.urgent")}</option>
            <option value="1-3mo">{t("consultation.timelineOption.1-3mo")}</option>
            <option value="3-6mo">{t("consultation.timelineOption.3-6mo")}</option>
            <option value="6mo+">{t("consultation.timelineOption.6mo+")}</option>
            <option value="exploring">{t("consultation.timelineOption.exploring")}</option>
          </SelectField>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("consultation.contactMethod")}>
          <SelectField name="contactMethod" className={selectClass} defaultValue="phone">
            <option value="phone">{t("consultation.contactOption.phone")}</option>
            <option value="email">{t("consultation.contactOption.email")}</option>
            <option value="whatsapp">{t("consultation.contactOption.whatsapp")}</option>
          </SelectField>
        </Field>
        <Field label={t("consultation.preferredTime")}>
          <SelectField name="preferredTime" className={selectClass} defaultValue="flexible">
            <option value="morning">{t("consultation.timeOption.morning")}</option>
            <option value="afternoon">{t("consultation.timeOption.afternoon")}</option>
            <option value="evening">{t("consultation.timeOption.evening")}</option>
            <option value="flexible">{t("consultation.timeOption.flexible")}</option>
          </SelectField>
        </Field>
      </div>

      <Field label={t("consultation.hearAbout")}>
        <SelectField name="source" className={selectClass} defaultValue="search">
          <option value="search">{t("consultation.sourceOption.search")}</option>
          <option value="referral">{t("consultation.sourceOption.referral")}</option>
          <option value="social">{t("consultation.sourceOption.social")}</option>
          <option value="event">{t("consultation.sourceOption.event")}</option>
          <option value="other">{t("consultation.sourceOption.other")}</option>
        </SelectField>
      </Field>

      <Field label={t("consultation.projectDetails")} required>
        <textarea
          name="message"
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder={t("consultation.messagePlaceholder")}
        />
      </Field>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 rounded border-outline-variant accent-secondary cursor-pointer"
        />
        <span className="text-caption text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors">
          {t("consultation.consent")}
        </span>
      </label>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-start text-label-md text-on-surface font-semibold tracking-wide">
        {label}
        {required && <span className="text-error ms-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-16 sm:py-20">
      <div className="relative mb-8">
        <div
          className="absolute inset-0 rounded-full bg-secondary/20 animate-ping"
          aria-hidden="true"
        />
        <div className="relative flex size-20 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg shadow-secondary/30">
          <span
            className="material-symbols-outlined text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            check_circle
          </span>
        </div>
      </div>
      <h2 className="font-headline-xl text-headline-xl text-primary font-bold mb-3">
        {t("consultation.successTitle")}
      </h2>
      <p className="text-on-surface-variant font-body-md max-w-md leading-relaxed mb-8">
        {t("consultation.successMessage")}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="py-3.5 px-10 rounded-xl bg-primary-container text-on-primary font-bold hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
      >
        {t("consultation.close")}
      </button>
    </div>
  );
}
