import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

const faqs = [
  {
    question: "How do I get Flow running on my system?",
    answer: "Simply download the installer for your OS (Windows, macOS, or Linux) from our releases page, run the installer, and you're good to go. Flow is designed to launch instantly and even supports auto-start on boot."
  },
  {
    question: "Is my data truly private?",
    answer: "100%. Flow is built as a local-first application. All your notes, AI conversations, and project data are stored directly on your computer as Markdown files. No cloud sync, no tracking, and no data ever leaves your machine."
  },
  {
    question: "How do the 'Ghost Text' and autocomplete features work?",
    answer: "Flow uses an integrated local LLM use 'Alt + c' for showing the AI's suggested continuation. 'Alt + x' to hide the suggestion. It predicts your next thought in real-time. As you type, simply press 'Tab' to accept the full suggestion, or 'Alt + Right Arrow' to accept word-by-word. It learns your style without needing to connect to any external servers."
  },
  {
    question: "Can I use Flow for project management?",
    answer: "Yes. By using status tags and sub-task checklists within your notes, you can easily track progress. Drag and drop your notes between 'To Do' and 'Done' states to keep your workflow fluid and distraction-free."
  },
  {
    question: "What are the recommended system specs?",
    answer: "Flow is optimized for performance. We recommend at least 8GB of RAM and a modern multi-core processor. Because the AI models run locally, a dedicated GPU is a bonus for speed, but the app is designed to run smoothly on any medium-powered laptop."
  },
  {
    question: "How can I support the developer?",
    answer: "Flow is 100% Open Source. If you find the app helpful, you can 'boost' the project via UPI or the support details listed in the footer. Your support directly helps fund the costs of keeping Flow fast, private, and free."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-white">
      <Card className="bg-slate-900/50 border-slate-800 shadow-2xl backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center text-white">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-slate-800">
                {/* Added 'no-underline' and ensured hover only affects color */}
                <AccordionTrigger className="text-left text-white hover:text-blue-400 transition-colors no-underline hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}