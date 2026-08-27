'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  Star,
  Menu,
  X,
  ShoppingCart,
  CreditCard,
  Truck,
  Mail,
  Phone,
  MapPin,
  Building2,
  ChevronRight,
  Zap,
  Users,
  TrendingUp,
  Clock,
} from 'lucide-react';

/* ============================================================
   BUSINESS INFORMATION (Airwallex Requirement)
   ============================================================ */
const BUSINESS = {
  name: 'NexaSoft Solutions Limited',
  shortName: 'NexaSoft',
  registrationNumber: '80954108',
  address: 'Suite 1205, 12/F, Tower B, 88 Queensway, Admiralty, Hong Kong',
  email: 'info@nexasoft.io',
  phone: '+852 5800 1234',
  governingLaw: 'Hong Kong SAR',
  website: 'www.nexasoft.io',
};

/* ============================================================
   SERVICES DATA
   ============================================================ */
const SERVICES = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Tailored software solutions built from the ground up to address your unique business challenges. From enterprise systems to specialized tools, we deliver robust, scalable applications designed for long-term performance and maintainability.',
    features: ['Requirements Analysis', 'Architecture Design', 'Agile Development', 'Quality Assurance'],
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    description:
      'Modern, responsive web applications using cutting-edge frameworks and technologies. We build everything from content-managed websites to complex SaaS platforms that drive engagement and conversions.',
    features: ['React & Next.js', 'Full-Stack Solutions', 'E-Commerce Platforms', 'Progressive Web Apps'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications for iOS and Android. Our team creates intuitive, high-performance apps that provide seamless user experiences across all devices and screen sizes.',
    features: ['iOS & Android', 'Cross-Platform (React Native)', 'App Store Optimization', 'Push Notifications'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions & DevOps',
    description:
      'Comprehensive cloud infrastructure design, migration, and management services. We help businesses leverage AWS, Google Cloud, and Azure to reduce costs, improve scalability, and enhance security.',
    features: ['Cloud Migration', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging'],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity Services',
    description:
      'Protect your digital assets with our end-to-end cybersecurity solutions. We conduct security audits, implement protective measures, and provide ongoing monitoring to safeguard your business against evolving threats.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance (GDPR, SOC2)', 'Incident Response'],
  },
  {
    icon: HeadphonesIcon,
    title: 'IT Consulting & Support',
    description:
      'Strategic IT consulting to help you make informed technology decisions. Our experts provide ongoing technical support, system maintenance, and technology roadmaps aligned with your business objectives.',
    features: ['Technology Strategy', 'System Integration', '24/7 Support Plans', 'Performance Optimization'],
  },
];

/* ============================================================
   PRICING / PRODUCTS DATA
   ============================================================ */
const PRODUCTS = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: 499,
    description: 'Perfect for small businesses needing a professional online presence with essential features.',
    features: [
      'Custom responsive website (up to 5 pages)',
      'Mobile-friendly design',
      'Basic SEO setup',
      'Contact form integration',
      'SSL certificate setup',
      '1 month of free support',
    ],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional Package',
    price: 1499,
    description: 'Ideal for growing businesses that need advanced features and a scalable web application.',
    features: [
      'Custom web application (up to 15 pages)',
      'Admin dashboard & CMS',
      'Advanced SEO & analytics',
      'E-commerce functionality',
      'Third-party API integrations',
      'Performance optimization',
      '3 months of free support',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    price: 3999,
    description: 'Comprehensive solution for established businesses requiring enterprise-grade applications.',
    features: [
      'Full-stack custom application',
      'Cloud deployment & DevOps',
      'Multi-tenant architecture',
      'Advanced security features',
      'Custom API development',
      'Load testing & QA',
      '12 months of priority support',
      'Dedicated project manager',
    ],
    popular: false,
  },
];

/* ============================================================
   TESTIMONIALS DATA
   ============================================================ */
const TESTIMONIALS = [
  {
    name: 'James Richardson',
    role: 'CEO, Meridian Logistics',
    text: 'NexaSoft transformed our logistics operations with a custom tracking platform. The team understood our requirements perfectly and delivered a solution that reduced our processing time by 40%. Their ongoing support has been exceptional.',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, Bloom Retail',
    text: 'We needed an e-commerce platform that could handle high traffic during sales events. NexaSoft built us a scalable solution that has processed over 50,000 orders without a single downtime incident. Highly recommend their services.',
    rating: 5,
  },
  {
    name: 'David Okonkwo',
    role: 'CTO, FinEdge Africa',
    text: 'The cybersecurity audit and infrastructure overhaul NexaSoft provided gave us the confidence to scale our fintech platform across three new markets. Their expertise in compliance and secure architecture is outstanding.',
    rating: 5,
  },
  {
    name: 'Maria Vasquez',
    role: 'Operations Director, Verde Foods',
    text: 'From initial consultation to final deployment, the NexaSoft team was professional and responsive. Our inventory management system now runs seamlessly, and the mobile app they built for our field staff is a game-changer.',
    rating: 5,
  },
];

/* ============================================================
   POLICIES CONTENT
   ============================================================ */
const PRIVACY_POLICY = `
**Last Updated: August 1, 2026**

NexaSoft Solutions Limited ("NexaSoft," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

## 1. Information We Collect

We may collect the following types of information:

**Personal Information:** Name, email address, phone number, company name, and billing address when you make a purchase, request a quote, or contact us through our forms.

**Technical Information:** IP address, browser type, operating system, device identifiers, pages visited, time spent on pages, and referring URLs, collected automatically through cookies and similar technologies.

**Payment Information:** When you make a purchase, payment details are processed securely through our payment service provider. We do not store full credit card numbers on our servers.

**Communication Data:** Records of correspondence when you contact us via email, phone, or contact forms.

## 2. How We Use Your Information

We use the information we collect to:

- Process and fulfill your orders for software development services
- Provide customer support and respond to your inquiries
- Send you order confirmations, invoices, and service updates
- Improve our website, services, and user experience
- Send promotional communications (only with your consent)
- Comply with legal obligations and enforce our agreements
- Detect, prevent, and address fraud and security issues

## 3. Information Sharing and Disclosure

We do not sell, trade, or rent your personal information to third parties. We may share your information with:

- **Service Providers:** Trusted third parties who assist us in operating our website, processing payments, or delivering services, subject to confidentiality agreements.
- **Legal Requirements:** When required by law, regulation, legal process, or governmental request.
- **Business Transfers:** In connection with any merger, acquisition, or sale of company assets.

## 4. Data Security

We implement industry-standard security measures including SSL encryption, secure server infrastructure, regular security audits, and access controls to protect your personal information. However, no method of internet transmission or electronic storage is 100% secure.

## 5. Cookies and Tracking Technologies

Our website uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser. Disabling cookies may affect some website functionality.

## 6. Data Retention

We retain your personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law. When data is no longer needed, it is securely deleted or anonymized.

## 7. Your Rights

Depending on your location, you may have the right to:

- Access, correct, or delete your personal information
- Object to or restrict processing of your data
- Request data portability
- Withdraw consent at any time

To exercise these rights, please contact us at ${BUSINESS.email}.

## 8. Third-Party Links

Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies before providing any personal information.

## 9. Children's Privacy

Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of the website after any changes constitutes acceptance of the updated policy.

## 11. Contact Us

If you have any questions about this Privacy Policy, please contact us:

**NexaSoft Solutions Limited**
${BUSINESS.address}
Email: ${BUSINESS.email}
Phone: ${BUSINESS.phone}
`;

const REFUND_POLICY = `
**Last Updated: August 1, 2026**

At NexaSoft Solutions Limited, we strive to deliver exceptional software development services. This Refund Policy outlines the conditions under which refunds may be issued for our products and services.

## 1. Service Deposits and Milestone Payments

For custom software development projects:

- **Project Deposits:** Deposits paid to initiate a project are non-refundable once work has commenced. Before work begins, you may request a full refund of any deposit within 48 hours of payment.

- **Milestone Payments:** Milestone payments are released upon client approval of completed deliverables. Once a milestone has been approved and payment processed, refunds for that milestone are not available.

- **Project Cancellation:** If you choose to cancel a project after work has begun, you will be billed for all completed work up to the date of cancellation. Any remaining balance will be refunded within 30 business days.

## 2. Pre-Built Software Products

For pre-built software packages and licenses:

- **30-Day Money-Back Guarantee:** If you are not satisfied with a pre-built software product, you may request a full refund within 30 calendar days of purchase, provided the software has not been extensively customized or deployed in a production environment.

- **Refund Process:** To initiate a refund, contact our support team at ${BUSINESS.email} with your order number and reason for the refund request. Refunds are processed within 14 business days after approval.

## 3. Subscription Services

For ongoing subscription and support plans:

- **Monthly Subscriptions:** You may cancel your subscription at any time. Upon cancellation, you will retain access to the service until the end of the current billing period. No partial-month refunds are provided.

- **Annual Subscriptions:** If you cancel an annual subscription within the first 30 days, you will receive a prorated refund for the unused months. After 30 days, cancellations take effect at the end of the current subscription period.

## 4. Non-Refundable Items

The following are not eligible for refunds:

- Domain registration fees once registered
- Third-party service licenses purchased on your behalf
- Custom branding or design work that has been delivered
- Training sessions that have been attended

## 5. How to Request a Refund

To request a refund, please:

1. Email us at ${BUSINESS.email} with the subject line "Refund Request – [Your Order Number]"
2. Include your full name, company name, and contact information
3. Provide the order number and date of purchase
4. Describe the reason for your refund request

Our team will review your request and respond within 5 business days.

## 6. Shipping and Delivery (For Physical Products)

While our primary services are digital, if any physical products or materials are shipped:

- Delivery times are estimates and may vary based on location
- Shipping costs are non-refundable unless the product is defective or incorrect
- We are not responsible for delays caused by customs, weather, or carrier issues

## 7. Contact Us

For any questions about this Refund Policy, please contact:

**NexaSoft Solutions Limited**
${BUSINESS.address}
Email: ${BUSINESS.email}
Phone: ${BUSINESS.phone}
`;

const TERMS_CONDITIONS = `
**Last Updated: August 1, 2026**

These Terms and Conditions ("Terms") govern your access to and use of the website and services provided by NexaSoft Solutions Limited ("NexaSoft," "we," "us," or "our"). By accessing or using our website and services, you agree to be bound by these Terms.

## 1. Definitions

- **"Services"** means custom software development, web development, mobile app development, cloud solutions, cybersecurity services, IT consulting, and any other services provided by NexaSoft.
- **"Client"** or **"you"** means the individual or entity accessing or using our services.
- **"Website"** means www.nexasoft.io and all associated pages.

## 2. Services Agreement

By purchasing our services, you agree to:

- Provide accurate and complete information necessary for service delivery
- Cooperate with our team during the development process
- Review and provide timely feedback on deliverables
- Comply with all applicable laws and regulations

## 3. Project Engagement

- **Proposals and Quotes:** All project proposals and quotes are valid for 30 days from the date of issue unless otherwise stated.
- **Scope Changes:** Any changes to the agreed project scope may result in adjustments to the timeline and cost. Change requests must be submitted in writing and approved by both parties.
- **Timeline:** Project timelines are estimates based on the scope agreed upon at the start of the engagement. NexaSoft will make reasonable efforts to meet agreed deadlines but is not liable for delays caused by factors beyond our control.

## 4. Intellectual Property

- **Client IP:** All intellectual property developed specifically for the client during a project engagement shall be transferred to the client upon full payment.
- **NexaSoft IP:** Pre-existing tools, frameworks, libraries, and methodologies used in delivering services remain the intellectual property of NexaSoft. Clients receive a perpetual, non-exclusive license to use these components.
- **Third-Party Components:** Third-party open-source or licensed components are subject to their respective license terms.

## 5. Payment Terms

- Invoices are issued according to the payment schedule agreed upon in the project proposal.
- Payment is due within 14 days of invoice date unless otherwise specified.
- Late payments may incur interest at a rate of 1.5% per month on the outstanding balance.
- NexaSoft reserves the right to suspend work on any project with overdue payments.

## 6. Confidentiality

Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement. This obligation survives the termination of these Terms.

## 7. Warranties and Disclaimers

- **Service Warranty:** NexaSoft warrants that services will be performed in a professional and workmanlike manner. For custom development, we provide a 90-day warranty period from project delivery to address any bugs or defects at no additional cost.
- **AS-IS:** Except as expressly stated, our website and services are provided "as is" without warranties of any kind, either express or implied.

## 8. Limitation of Liability

To the maximum extent permitted by law, NexaSoft's total liability for any claims arising from or related to these Terms or our services shall not exceed the total amount paid by the client for the specific service giving rise to the claim.

## 9. Termination

- Either party may terminate a service engagement with 30 days' written notice.
- Upon termination, the client is responsible for payment of all work completed up to the termination date.
- NexaSoft will provide all completed deliverables and source code upon receipt of outstanding payments.

## 10. Governing Law and Dispute Resolution

These Terms are governed by and construed in accordance with the laws of ${BUSINESS.governingLaw}. Any disputes arising from these Terms shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the exclusive jurisdiction of the courts of ${BUSINESS.governingLaw}.

## 11. Modifications

NexaSoft reserves the right to modify these Terms at any time. Changes will be effective upon posting to our website. Continued use of our services after modifications constitutes acceptance of the revised Terms.

## 12. Contact Information

For questions about these Terms and Conditions, please contact:

**NexaSoft Solutions Limited**
Business Registration No.: ${BUSINESS.registrationNumber}
${BUSINESS.address}
Email: ${BUSINESS.email}
Phone: ${BUSINESS.phone}
`;

/* ============================================================
   NAVIGATION ITEMS
   ============================================================ */
const NAV_ITEMS = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
];

/* ============================================================
   HELPER: Render Markdown-like Policy Text
   ============================================================ */
function PolicyContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) {
        elements.push(<ul key={`ul-end-${i}`} />);
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) {
        elements.push(<ul key={`ul-sec-${i}`} />);
        inList = false;
      }
      elements.push(
        <h2 key={`h2-${i}`} className="text-lg font-semibold mt-8 mb-3 text-foreground">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      if (inList) {
        elements.push(<ul key={`ul-bold-${i}`} />);
        inList = false;
      }
      elements.push(
        <p key={`bold-${i}`} className="font-semibold mt-4 mb-2 text-foreground">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith('- ')) {
      if (!inList) {
        elements.push(<ul key={`ul-start-${i}`} className="list-disc list-inside space-y-1 ml-4 mb-3 text-muted-foreground" />);
        inList = true;
      }
      elements.push(
        <li key={`li-${i}`} className="text-muted-foreground leading-relaxed">
          {renderInlineBold(trimmed.slice(2))}
        </li>
      );
    } else if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl font-bold mt-6 mb-4 text-foreground">
          {trimmed.slice(2)}
        </h1>
      );
    } else {
      if (inList) {
        elements.push(<ul key={`ul-p-${i}`} />);
        inList = false;
      }
      elements.push(
        <p key={`p-${i}`} className="text-muted-foreground leading-relaxed mb-2">
          {renderInlineBold(trimmed)}
        </p>
      );
    }
  }

  if (inList) elements.push(<ul key="ul-final" />);
  return <div className="space-y-1">{elements}</div>;
}

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

/* ============================================================
   STAR RATING COMPONENT
   ============================================================ */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

/* ============================================================
   SECTION HEADER COMPONENT
   ============================================================ */
function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
      <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
        {badge}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{subtitle}</p>
    </div>
  );
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof PRODUCTS)[0] | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: '',
    notes: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const servicesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: { current: null },
      services: servicesRef,
      pricing: pricingRef,
      about: aboutRef,
      contact: contactRef,
    };
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      map[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBuyNow = (product: (typeof PRODUCTS)[0]) => {
    setSelectedProduct(product);
    setCheckoutStep(1);
    setOrderPlaced(false);
    setFormData({ fullName: '', email: '', phone: '', company: '', address: '', city: '', country: '', notes: '' });
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    setOrderPlaced(true);
    setCartCount(0);
    toast({ title: 'Order Placed Successfully', description: `Your ${selectedProduct?.name} order has been received. We will contact you within 24 hours.` });
  };

  /* ---- Policy content map ---- */
  const policyMap: Record<string, { title: string; content: string }> = {
    privacy: { title: 'Privacy Policy', content: PRIVACY_POLICY },
    refund: { title: 'Refund Policy', content: REFUND_POLICY },
    terms: { title: 'Terms & Conditions', content: TERMS_CONDITIONS },
  };

  const PolicyDialog = isMobile
    ? ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
            <SheetHeader className="mb-4">
              <SheetTitle>{policyModal ? policyMap[policyModal]?.title : ''}</SheetTitle>
              <SheetDescription>Review our policies below.</SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto flex-1 pr-2 -mr-2">
              {policyModal && <PolicyContent content={policyMap[policyModal]?.content || ''} />}
            </div>
          </SheetContent>
        </Sheet>
      )
    : ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{policyModal ? policyMap[policyModal]?.title : ''}</DialogTitle>
              <DialogDescription>Review our policies below.</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 pr-2 -mr-2 mt-4">
              {policyModal && <PolicyContent content={policyMap[policyModal]?.content || ''} />}
            </div>
          </DialogContent>
        </Dialog>
      );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">NexaSoft</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA + Cart + Mobile Menu */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => scrollTo('pricing')}
                className="hidden sm:inline-flex"
                size="sm"
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => scrollTo('pricing')}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-border py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button className="w-full mt-2" size="sm" onClick={() => { scrollTo('pricing'); setMobileMenuOpen(false); }}>
                Get Started
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1">
        {/* ---- HERO SECTION ---- */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
                Trusted by 200+ Businesses Worldwide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                We Build Software{' '}
                <span className="text-primary">That Drives</span> Your Business Forward
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                From custom web applications to enterprise-grade cloud solutions, NexaSoft delivers reliable, scalable software tailored to your business needs. Our team of experienced developers turns your vision into reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollTo('pricing')} className="text-base">
                  View Our Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo('services')} className="text-base">
                  Explore Services
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>90-Day Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Agile Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- STATS BAR ---- */}
        <section className="border-y border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: Users, value: '200+', label: 'Clients Served' },
                { icon: Code2, value: '350+', label: 'Projects Delivered' },
                { icon: TrendingUp, value: '98%', label: 'Client Satisfaction' },
                { icon: Clock, value: '8+', label: 'Years of Experience' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- SERVICES SECTION ---- */}
        <section ref={servicesRef} id="services" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Our Services"
              title="Comprehensive Software Solutions"
              subtitle="We offer a full spectrum of software development and IT services to help businesses innovate, scale, and succeed in the digital landscape."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <Card key={service.title} className="group hover:shadow-md transition-shadow border-border/60">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---- PRICING SECTION ---- */}
        <section ref={pricingRef} id="pricing" className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Pricing"
              title="Transparent, Fixed-Price Packages"
              subtitle="Choose a package that fits your needs. Every package includes a free initial consultation, detailed project proposal, and our 90-day warranty on all deliverables."
            />
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {PRODUCTS.map((product) => (
                <Card
                  key={product.id}
                  className={`relative flex flex-col ${product.popular ? 'border-primary shadow-lg scale-[1.02]' : 'border-border/60'}`}
                >
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2 pt-6">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${product.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">one-time</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                    <Separator className="mb-6" />
                    <ul className="space-y-3">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      className={`w-full ${product.popular ? '' : 'variant-outline'}`}
                      variant={product.popular ? 'default' : 'outline'}
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---- ABOUT SECTION ---- */}
        <section ref={aboutRef} id="about" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="About Us"
              title="Built on Trust, Driven by Innovation"
              subtitle="NexaSoft Solutions Limited is a Hong Kong-registered software development company delivering world-class IT solutions to businesses across the globe."
            />
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Founded with a mission to democratize access to high-quality software development, NexaSoft Solutions Limited has grown from a small team of passionate developers into a trusted technology partner for over 200 businesses worldwide. Our Hong Kong headquarters serves as the hub for our global operations, enabling us to serve clients across Asia, Europe, North America, and beyond.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We specialize in custom software development, web and mobile application development, cloud infrastructure, and cybersecurity services. Every project we undertake is guided by our core principles: transparent communication, agile delivery, and an unwavering commitment to quality. We believe that great software is built through deep collaboration with our clients, understanding their business inside out before writing a single line of code.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team comprises senior engineers, architects, and designers with decades of combined experience across industries including fintech, e-commerce, logistics, healthcare, and education. Whether you are a startup building your first MVP or an enterprise modernizing legacy systems, NexaSoft has the expertise and the dedication to deliver results that exceed expectations.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Badge variant="secondary" className="px-3 py-1.5">Agile Methodology</Badge>
                  <Badge variant="secondary" className="px-3 py-1.5">ISO 27001 Compliant</Badge>
                  <Badge variant="secondary" className="px-3 py-1.5">SOC2 Ready</Badge>
                  <Badge variant="secondary" className="px-3 py-1.5">GDPR Compliant</Badge>
                </div>
              </div>
              <Card className="border-border/60">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Company Name</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.name}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Business Registration No.</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.registrationNumber}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Registered Address</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.address}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Email</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.email}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Phone</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.phone}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ---- TESTIMONIALS ---- */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Testimonials"
              title="What Our Clients Say"
              subtitle="Do not just take our word for it. Here is what business leaders around the world have to say about working with NexaSoft."
            />
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="border-border/60">
                  <CardContent className="p-6">
                    <StarRating rating={t.rating} />
                    <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-5">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CONTACT SECTION ---- */}
        <section ref={contactRef} id="contact" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Contact Us"
              title="Ready to Start Your Project?"
              subtitle="Get in touch with our team for a free consultation. We will discuss your requirements and provide a detailed project proposal within 48 hours."
            />
            <div className="max-w-2xl mx-auto">
              <Card className="border-border/60">
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-sm font-medium">Full Name *</label>
                        <Input id="contact-name" placeholder="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-sm font-medium">Email Address *</label>
                        <Input id="contact-email" type="email" placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-phone" className="text-sm font-medium">Phone Number</label>
                        <Input id="contact-phone" type="tel" placeholder="+1 234 567 890" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-company" className="text-sm font-medium">Company Name</label>
                        <Input id="contact-company" placeholder="Your Company" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-service" className="text-sm font-medium">Service Interested In</label>
                      <Select>
                        <SelectTrigger id="contact-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((s) => (
                            <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                          ))}
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-sm font-medium">Project Details</label>
                      <Textarea id="contact-message" placeholder="Tell us about your project, goals, and timeline..." rows={5} />
                    </div>
                    <Button className="w-full" size="lg" onClick={() => toast({ title: 'Message Sent', description: 'We will get back to you within 24 hours.' })}>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ---- WHY CHOOSE US (Trust Signals) ---- */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Why NexaSoft"
              title="The NexaSoft Advantage"
              subtitle="We combine technical excellence with a client-first approach to deliver software solutions that make a real difference for your business."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'Enterprise-grade security practices and 99.9% uptime guarantee for all deployed solutions.' },
                { icon: Zap, title: 'Rapid Delivery', desc: 'Agile development methodology ensures fast turnaround without compromising on quality.' },
                { icon: HeadphonesIcon, title: 'Dedicated Support', desc: '24/7 technical support and a dedicated project manager for every engagement.' },
                { icon: TrendingUp, title: 'Scalable Solutions', desc: 'Architecture designed to grow with your business, from startup to enterprise scale.' },
              ].map((item) => (
                <Card key={item.title} className="text-center border-border/60">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight">NexaSoft</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Professional software development and IT consulting services for businesses worldwide.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{BUSINESS.name}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{BUSINESS.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground transition-colors">{BUSINESS.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${BUSINESS.phone}`} className="hover:text-foreground transition-colors">{BUSINESS.phone}</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {item.label}
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <button
                      onClick={() => scrollTo('services')}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {s.title}
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => setPolicyModal('privacy')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Privacy Policy
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('refund')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Refund Policy
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('terms')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Terms & Conditions
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </li>
              </ul>
              <div className="mt-6 p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">Governing Law</div>
                <div className="text-sm font-medium">{BUSINESS.governingLaw}</div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. Business Registration No.: {BUSINESS.registrationNumber}.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setPolicyModal('privacy')} className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button onClick={() => setPolicyModal('refund')} className="hover:text-foreground transition-colors">Refund Policy</button>
              <button onClick={() => setPolicyModal('terms')} className="hover:text-foreground transition-colors">Terms & Conditions</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== POLICY MODAL ==================== */}
      <PolicyDialog open={!!policyModal} onOpenChange={(v) => !v && setPolicyModal(null)} />

      {/* ==================== CHECKOUT MODAL ==================== */}
      {isMobile ? (
        <Sheet open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <SheetContent side="bottom" className="h-[92vh] rounded-t-2xl">
            <SheetHeader className="mb-4">
              <SheetTitle>{orderPlaced ? 'Order Confirmed' : 'Checkout'}</SheetTitle>
              <SheetDescription>
                {orderPlaced
                  ? 'Thank you for your order!'
                  : selectedProduct
                  ? `Complete your purchase of ${selectedProduct.name}`
                  : ''}
              </SheetDescription>
            </SheetHeader>
            <CheckoutContent />
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{orderPlaced ? 'Order Confirmed' : 'Checkout'}</DialogTitle>
              <DialogDescription>
                {orderPlaced
                  ? 'Thank you for your order!'
                  : selectedProduct
                  ? `Complete your purchase of ${selectedProduct.name}`
                  : ''}
              </DialogDescription>
            </DialogHeader>
            <CheckoutContent />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  /* ---- CHECKOUT INNER CONTENT ---- */
  function CheckoutContent() {
    if (orderPlaced) {
      return (
        <div className="text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold">Order Placed Successfully!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Thank you for choosing {BUSINESS.name}. We have received your order for the{' '}
            <span className="font-semibold text-foreground">{selectedProduct?.name}</span>.
            Our team will contact you within 24 hours at {formData.email} to begin your project.
          </p>
          <p className="text-sm text-muted-foreground">Order reference will be sent to your email.</p>
          <Button onClick={() => setCheckoutOpen(false)} className="mt-4">
            Back to Website
          </Button>
        </div>
      );
    }

    return (
      <div className="overflow-y-auto flex-1 -mr-2 pr-2 mt-4 space-y-6">
        {/* Order Summary */}
        <Card className="border-border/60">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3">Order Summary</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{selectedProduct?.name}</span>
              <span className="font-semibold">${selectedProduct?.price}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">${selectedProduct?.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setCheckoutStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              checkoutStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            1. Details
          </button>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <button
            onClick={() => { if (formData.fullName && formData.email) setCheckoutStep(2); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              checkoutStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            2. Payment
          </button>
        </div>

        {checkoutStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Your Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  placeholder="John Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Address</label>
              <Input
                placeholder="123 Business Street"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">City</label>
                <Input
                  placeholder="Hong Kong"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Country</label>
                <Input
                  placeholder="Hong Kong SAR"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Project Notes (Optional)</label>
              <Textarea
                placeholder="Any specific requirements or details about your project..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (!formData.fullName || !formData.email || !formData.phone) {
                  toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
                  return;
                }
                setCheckoutStep(2);
              }}
            >
              Continue to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {checkoutStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Method</h3>
            <Card className="border-primary cursor-pointer" onClick={handlePlaceOrder}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Cash on Delivery (COD)</div>
                  <div className="text-xs text-muted-foreground">Pay when the project milestones are delivered. No upfront online payment required.</div>
                </div>
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="border-border/60 opacity-60">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Online Payment (Coming Soon)</div>
                  <div className="text-xs text-muted-foreground">Credit card, debit card, and bank transfer options will be available soon.</div>
                </div>
              </CardContent>
            </Card>
            <Separator />
            <div className="text-xs text-muted-foreground space-y-1">
              <p>By placing this order, you agree to our{' '}
                <button onClick={() => { setCheckoutOpen(false); setPolicyModal('terms'); }} className="underline hover:text-foreground">Terms & Conditions</button>
                {' '}and{' '}
                <button onClick={() => { setCheckoutOpen(false); setPolicyModal('privacy'); }} className="underline hover:text-foreground">Privacy Policy</button>.
              </p>
              <p>Your information is secured with SSL encryption. {BUSINESS.name} is registered in {BUSINESS.governingLaw} (Reg. No.: {BUSINESS.registrationNumber}).</p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCheckoutStep(1)}
            >
              Back to Details
            </Button>
          </div>
        )}
      </div>
    );
  }
}
