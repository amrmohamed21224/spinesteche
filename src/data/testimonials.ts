import { CMSTestimonial, CMSTeamMember } from "../types/cms";

export const mockTestimonials: CMSTestimonial[] = [
  {
    id: "t1",
    name: "م. أحمد الشمري",
    role: "المدير التقني",
    company: "الخدمة السحابية الوطنية",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgtBiQK7LIwx2erOBx8kYFZPJCGJsxKozB75NqO-qMmiE2MLdX_ciK7HGWjEGDFZaNGvtHYfHrfWVR489fEQ3ljqvTD1h8BmtgBlKeT6TuWfbPLs8mQguCewgG7MYM47D1mVmfxouLpK_-8Kk-Cj2SqdXtPV-VpiOfjHJiWUN9bZ1zK5zkamKRWqycY_46irTPXyPiyMKx-Sl4rP0Pm59fHupf2A2AAjOGH1s2TOgHRdOMY1hj9CJwzChfJBuhI1Ht-KcW8hG7kHSd",
    quote:
      "حققت لنا SpinesTech تحولاً حقيقياً في عملياتنا من خلال نظام الـ ERP المطور خصيصاً. دقة المخازن والسرعة في إعداد الفواتير الإلكترونية فاقت توقعاتنا.",
    rating: 5,
  },
  {
    id: "t2",
    name: "سارة القحطاني",
    role: "مديرة إدارة العمليات",
    company: "براند العقارية الكبرى",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALlnEpwMFPEX9boAFbAFv3oiBKNFMDciMEvwSad7SByzcAjvWn4d3zxBezgPYnL8lQTjN1EWKlcpr5VRP0fVLk03E8cx-OTRMxCqx_b0obKR9F5WfmGPMsWS2aBI531vQ4KxjvQBk38VbISPIXIeu06q3lW-VIzhKJhYI-wkw3i4PyANTjO4CUFFw8JqZ1dveNDS54yW220Xo3tGMfGZ2apF_C4ZawjiHa8XVT9CCkIuIk_In4op_Ey4n5sGu3BXEIii_YW7bHvDsf",
    quote:
      "الالتزام بمواعيد التسليم والموثوقية السيادية التي تتمتع بها SpinesTech هي ما يجعلهم شريكنا التقني الدائم لجميع مشاريعنا القادمة.",
    rating: 5,
  },
];

export const mockTeamMembers: CMSTeamMember[] = [
  {
    id: "tm1",
    name: "د. سلمان العتيبي",
    role: "المؤسس والرئيس التنفيذي",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALlnEpwMFPEX9boAFbAFv3oiBKNFMDciMEvwSad7SByzcAjvWn4d3zxBezgPYnL8lQTjN1EWKlcpr5VRP0fVLk03E8cx-OTRMxCqx_b0obKR9F5WfmGPMsWS2aBI531vQ4KxjvQBk38VbISPIXIeu06q3lW-VIzhKJhYI-wkw3i4PyANTjO4CUFFw8JqZ1dveNDS54yW220Xo3tGMfGZ2apF_C4ZawjiHa8XVT9CCkIuIk_In4op_Ey4n5sGu3BXEIii_YW7bHvDsf",
    bio: "أكثر من 15 عاماً من الخبرة في توجيه استراتيجيات التحول الرقمي وإدارة المشاريع القومية.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "tm2",
    name: "م. خالد الحربي",
    role: "مدير قطاع الهندسة البرمجية",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALlnEpwMFPEX9boAFbAFv3oiBKNFMDciMEvwSad7SByzcAjvWn4d3zxBezgPYnL8lQTjN1EWKlcpr5VRP0fVLk03E8cx-OTRMxCqx_b0obKR9F5WfmGPMsWS2aBI531vQ4KxjvQBk38VbISPIXIeu06q3lW-VIzhKJhYI-wkw3i4PyANTjO4CUFFw8JqZ1dveNDS54yW220Xo3tGMfGZ2apF_C4ZawjiHa8XVT9CCkIuIk_In4op_Ey4n5sGu3BXEIii_YW7bHvDsf",
    bio: "خبير النظم الموزعة والحوسبة السحابية مع سجل إنجازات يضم بناء بنى تحتية لأكثر من 50 جهة.",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
];
