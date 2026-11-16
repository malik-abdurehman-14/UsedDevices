import type { Locale } from "@/i18n/config";

/**
 * Privacy policy — a reasonable starting template covering Japan's APPI and GDPR basics.
 * ⚠️ Have it reviewed by a legal professional before launch.
 */
export const privacyPage: Record<
  Locale,
  { meta: { title: string; description: string }; eyebrow: string; title: string; updated: string; intro: string; sections: { h: string; p: string[] }[] }
> = {
  en: {
    meta: { title: "Privacy Policy", description: "How we collect, use and protect personal information submitted through this website." },
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: 14 November 2026",
    intro:
      "This policy explains how we handle personal information collected through this website, in accordance with Japan’s Act on the Protection of Personal Information (APPI) and, where applicable, the EU General Data Protection Regulation (GDPR).",
    sections: [
      {
        h: "1. Information we collect",
        p: [
          "When you send an inquiry, we collect the details you provide: your name, company, country or region, email address, phone or WhatsApp number, product interests, quantities and any message.",
          "With your consent, we use Google Analytics to collect anonymous usage data such as pages visited, device type and approximate location. No analytics cookies are set unless you accept them.",
        ],
      },
      {
        h: "2. How we use it",
        p: [
          "To reply to your inquiry, prepare quotations and stock lists, carry out purchases and sales, meet legal obligations (including identity verification required by Japan’s Secondhand Articles Dealer Act), and improve this website.",
          "We do not sell your personal information, and we do not use it for unrelated marketing without your permission.",
        ],
      },
      {
        h: "3. Sharing with third parties",
        p: [
          "We share information only with service providers that help us operate — such as our email delivery provider, hosting provider, analytics provider and logistics partners — and only to the extent needed. Some of these providers may process data outside Japan, under appropriate safeguards.",
          "We may disclose information where required by law.",
        ],
      },
      {
        h: "4. Retention and security",
        p: [
          "We keep inquiry information for as long as needed to respond and maintain business records, and take reasonable technical and organisational measures to protect it.",
          "All devices we purchase are securely data-wiped; personal data left on devices is never accessed or retained.",
        ],
      },
      {
        h: "5. Your rights",
        p: [
          "You may request access to, correction of, or deletion of your personal information, or withdraw consent to analytics at any time by clearing your cookie preference in your browser. To make a request, contact us using the details below.",
        ],
      },
      {
        h: "6. Contact",
        p: ["For privacy questions, please contact us by email or WhatsApp using the details shown in the footer of this website."],
      },
    ],
  },
  ja: {
    meta: { title: "プライバシーポリシー", description: "当サイトにおける個人情報の取り扱いについて。" },
    eyebrow: "個人情報保護方針",
    title: "プライバシーポリシー",
    updated: "最終更新日：2026年11月14日",
    intro: "当社は、個人情報の保護に関する法律（個人情報保護法）その他の関係法令を遵守し、当サイトを通じて取得する個人情報を以下のとおり適切に取り扱います。",
    sections: [
      {
        h: "1. 取得する情報",
        p: [
          "お問い合わせ・査定のご依頼時に、お名前、会社名、都道府県・国、メールアドレス、電話番号・WhatsApp番号、端末の種類・台数、お問い合わせ内容など、お客様が入力された情報を取得します。",
          "お客様の同意がある場合に限り、Google アナリティクスを利用して、閲覧ページ・端末の種類・おおよその地域などの統計情報を取得します。同意いただくまで分析用のCookieは使用しません。",
        ],
      },
      {
        h: "2. 利用目的",
        p: [
          "お問い合わせへの回答、査定・お見積りのご提示、買取・販売取引の実施、古物営業法に基づく本人確認その他法令上の義務の履行、当サイトの改善のために利用します。",
          "取得した個人情報を第三者に販売することはありません。",
        ],
      },
      {
        h: "3. 第三者への提供・委託",
        p: [
          "メール配信、サーバー、アクセス解析、配送などの業務を外部事業者に委託する場合があります。その際は必要な範囲でのみ情報を提供し、適切な監督を行います。委託先には日本国外の事業者が含まれる場合があります。",
          "法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供することはありません。",
        ],
      },
      {
        h: "4. 保管と安全管理",
        p: [
          "個人情報は利用目的に必要な期間保管し、漏えい・滅失・毀損の防止のために適切な安全管理措置を講じます。",
          "お買い取りした端末に残されたデータは確実に消去し、閲覧・保持することはありません。",
        ],
      },
      {
        h: "5. 開示・訂正・削除等のご請求",
        p: ["ご本人から個人情報の開示・訂正・利用停止・削除のご請求があった場合は、法令に従い適切に対応いたします。下記の窓口までご連絡ください。"],
      },
      {
        h: "6. お問い合わせ窓口",
        p: ["個人情報の取り扱いに関するお問い合わせは、当サイトのフッターに記載のメールアドレスまたはWhatsAppまでご連絡ください。"],
      },
    ],
  },
};
