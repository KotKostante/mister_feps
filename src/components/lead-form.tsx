"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui";
import { cities, services } from "@/data/site";

const schema = z.object({
  objectType: z.string().min(2, "Укажите тип объекта"),
  city: z.string().min(2, "Выберите город"),
  area: z.string().min(1, "Укажите площадь"),
  service: z.string().min(2, "Выберите услугу"),
  schedule: z.string().min(2, "Укажите график"),
  task: z.string().min(2, "Укажите задачу"),
  name: z.string().min(2, "Укажите имя"),
  phone: z.string().min(7, "Укажите телефон"),
  email: z.string().email("Укажите корректный email").or(z.literal("")),
  comment: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export function LeadForm({ city, service }: { city?: string; service?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: city ?? "",
      service: service ?? "",
      email: "",
      schedule: "",
      task: ""
    }
  });

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
      window.dispatchEvent(new CustomEvent("mister-fapc-event", { detail: { event: "form_submit", city: values.city, page_type: "form" } }));
    } catch {
      setStatus("error");
    }
  }

  return (
    <form id="lead-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-xl border border-border bg-surface p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Тип объекта" error={errors.objectType?.message}>
          <input {...register("objectType")} placeholder="Офис, склад, производство" className="field" />
        </Field>
        <Field label="Город" error={errors.city?.message}>
          <select {...register("city")} className="field">
            <option value="">Выберите город</option>
            {cities.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}
          </select>
        </Field>
        <Field label="Площадь" error={errors.area?.message}>
          <input {...register("area")} placeholder="Например, 1800 м2" className="field" />
        </Field>
        <Field label="Услуга" error={errors.service?.message}>
          <select {...register("service")} className="field">
            <option value="">Выберите услугу</option>
            {services.map((item) => <option key={item.slug} value={item.title}>{item.title}</option>)}
            <option value="Аудит уборки">Аудит уборки</option>
            <option value="Санитарная обработка">Санитарная обработка</option>
          </select>
        </Field>
        <Field label="График / частота" error={errors.schedule?.message}>
          <input {...register("schedule")} placeholder="Разово, ежедневно, ночью" className="field" />
        </Field>
        <Field label="Что сейчас нужно" error={errors.task?.message}>
          <select {...register("task")} className="field">
            <option value="">Выберите задачу</option>
            <option>Разовая уборка</option>
            <option>Регулярное обслуживание</option>
            <option>После ремонта</option>
            <option>После ЧП</option>
            <option>Аудит текущей уборки</option>
          </select>
        </Field>
        <Field label="Имя" error={errors.name?.message}>
          <input {...register("name")} placeholder="Как к вам обращаться" className="field" />
        </Field>
        <Field label="Телефон" error={errors.phone?.message}>
          <input {...register("phone")} placeholder="+7" className="field" />
        </Field>
      </div>
      <Field label="Email" error={errors.email?.message}>
        <input {...register("email")} placeholder="Для КП и документов" className="field" />
      </Field>
      <Field label="Комментарий" error={errors.comment?.message}>
        <textarea {...register("comment")} rows={4} placeholder="Расскажите о сроках, доступе, текущих проблемах" className="field min-h-28 py-3" />
      </Field>
      <Button type="submit" disabled={status === "loading"} className="gap-2">
        <Send className="h-4 w-4" />
        {status === "loading" ? "Отправляем..." : "Рассчитать стоимость уборки"}
      </Button>
      {status === "success" ? <p className="text-sm font-medium text-success">Заявка принята. Менеджер подготовит расчет и свяжется с вами.</p> : null}
      {status === "error" ? <p className="text-sm font-medium text-error">Не удалось отправить форму. Позвоните менеджеру или попробуйте еще раз.</p> : null}
      <p className="text-xs leading-5 text-muted">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Данные нужны только для расчета и связи.</p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
      {error ? <span className="text-xs text-error">{error}</span> : null}
    </label>
  );
}
