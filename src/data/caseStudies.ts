import { CMSCaseStudy } from "../types/cms";

export const mockCaseStudies: CMSCaseStudy[] = [
  {
    id: "cs1",
    title: "نظام ERP متكامل لسلسلة توريد كبرى",
    client: "مجموعة التوريد الوطنية",
    sector: "تجارة التجزئة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpxph-zdRpZ18KBB89xhbDLw7IRBuC5gRTbE3YHx-0HDjgEh31yfQEQUpHFBIRvxDRXbCh8ce4slzkZbY64k9sHxijKeVNUVbcJPez79RGeX-a49M7MaemlBYenSZWCLaBTrTrS6nlDGOIgbc5XuD69_dqCAimQS7WkXIW-VofX6xWqo0GhSj5FRcA9hKUwTwuePSSav3PY6aMcjRgamAoMuqEug24cGunya59_bKfOGdXr_3gSMzrpyjHPeM9sQpmikyy3Si5BVC9",
    slug: "supply-chain-erp",
    challenge:
      "تشتت البيانات وفقدان 15% من المخزون بسبب عدم المزامنة اللحظية بين الفروع والمركز الرئيسي.",
    solution: "تطوير محرك مركزي للمخزون مع تكامل API لجميع نقاط البيع وإدارة النقل المؤتمتة.",
    result: "دقة في المخزون بنسبة 99.8% وخفض التكاليف التشغيلية بـ 22% خلال السنة الأولى.",
    stats: [
      { label: "دقة المخزون", value: "99.8%" },
      { label: "خفض التكاليف", value: "22%" },
    ],
  },
  {
    id: "cs2",
    title: "إدارة علاقات العملاء (CRM) لمطور عقاري",
    client: "دار الإعمار العقارية",
    sector: "قطاع العقارات",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwiY-q3hRY7OVudVpWOcooFxq3xSiMIqMK5MLrjzZn4GXTG_KW6ZXEQcBKaJz7DY4dv8VoWjsmTM93dL5XNDgs8sotFCbbVIEzYnEHTh-QlskbZliWHPZlMTH2-A1qpZXWz6smvfND7EcS8Zd8ivkSlRKPa6lzvFTZ0go-WnT0bDPIxzEHJoIXYEN4MmyfROg8yOke4HXYYUTjjlw97G3TGTv60kPZM8CN5j2hFh3TRMrjXg7FLS2qSlljAX5xc6kl8IBBawndnjfc",
    slug: "real-estate-crm",
    challenge:
      "صعوبة متابعة دورة حياة العميل (Lead) من مرحلة الاهتمام الأولية وحتى مرحلة تملك وتوقيع العقود.",
    solution:
      "منصة ذكية لمتابعة المبيعات مع نظام تنبيهات تلقائي وتحليل سلوك العملاء وتفعيل الواتساب API.",
    result: "زيادة معدلات التحويل (Conversion) بنسبة 40% في السنة الأولى وتسهيل العمليات للفريق.",
    stats: [
      { label: "زيادة التحويلات", value: "40%" },
      { label: "رضا فريق المبيعات", value: "95%" },
    ],
  },
  {
    id: "cs3",
    title: "تطوير منصة أزياء فاخرة للمنطقة",
    client: "براند الهوية والجمال",
    sector: "التجارة الإلكترونية",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgtBiQK7LIwx2erOBx8kYFZPJCGJsxKozB75NqO-qMmiE2MLdX_ciK7HGWjEGDFZaNGvtHYfHrfWVR489fEQ3ljqvTD1h8BmtgBlKeT6TuWfbPLs8mQguCewgG7MYM47D1mVmfxouLpK_-8Kk-Cj2SqdXtPV-VpiOfjHJiWUN9bZ1zK5zkamKRWqycY_46irTPXyPiyMKx-Sl4rP0Pm59fHupf2A2AAjOGH1s2TOgHRdOMY1hj9CJwzChfJBuhI1Ht-KcW8hG7kHSd",
    slug: "fashion-ecommerce",
    challenge: "بطء الأداء في أوقات الذروة وتجربة مستخدم غير متوافقة مع تفضيلات المتسوق الخليجي.",
    solution:
      "بنية تحتية سحابية قابلة للتوسع مع واجهة مستخدم (UI/UX) عربية بالكامل ونظام دفع سريع بضغطة زر.",
    result: "تحسن في سرعة التصفح بنسبة 300% وزيادة المبيعات والطلب بنسبة 55%.",
    stats: [
      { label: "تحسن السرعة", value: "300%" },
      { label: "نمو المبيعات", value: "55%" },
    ],
  },
  {
    id: "cs4",
    title: "عميل ذكي (AI Agent) لخدمة العملاء",
    client: "الخدمة الذكية للاتصالات",
    sector: "الذكاء الاصطناعي",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8QaFFFQNOs_wSBQ9SSe4SIw8fjhjO5ylG2FZzvW-oDDzhRQow1G7j3qayCvSvXNwVQ3gJUXHA0QNYR8-NuUclI3yrHqkKhsmbJF8UNpdQ27p0ceiZf-oaHj6UnUZ1hulELUgdsDTCt3mVFBWdao4Lh4zlH1b71EGHQ6mofrmx9tv7DF_q_w8LhC1SHJjZ5LjzU5cMoohoLbttF-ebYRWtOMfudv9p8QOzMfOeZjpD1SaJ1n0ciuiXbgIWJiXXogyMuNNykbIyaYha",
    slug: "customer-service-ai-agent",
    challenge:
      "ضغط هائل على مركز الاتصال وتأخر كبير في معالجة الشكاوى والاستفسارات الروتينية المتكررة.",
    solution:
      "تدريب نموذج لغوي مخصص (LLM) لفهم اللهجات السعودية والخليجية ومعالجة طلبات العملاء تلقائيًا وبسرعة.",
    result: "حل 70% من الاستفسارات دون تدخل بشري وتقليل متوسط وقت الاستجابة لثوانٍ معدودة.",
    stats: [
      { label: "حل تلقائي", value: "70%" },
      { label: "وقت الاستجابة", value: "< 3 ثوانٍ" },
    ],
  },
];
