
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Move the templates from the main file
const PROMPT_STYLES = {
  STEP_BY_STEP: {
    name: "Step-by-Step Instructions",
    template: "I need a step-by-step guide on [TOPIC]. For each step, please:\n1. Explain what to do\n2. Why it's important\n3. Include any warnings or tips\nThe guide should be appropriate for someone with [EXPERIENCE_LEVEL] experience."
  },
  COMPARISON: {
    name: "Comparison Analysis",
    template: "Compare and contrast [ITEM1] and [ITEM2] in terms of:\n- Key features\n- Pros and cons\n- Best use cases\n- Cost considerations\nPlease format your response in a structured way with clear headings and bullet points."
  },
  EXPERT_ROLE: {
    name: "Expert Role Play",
    template: "As an expert in [FIELD], please explain [TOPIC] to me. Include:\n- Key concepts I should understand\n- Common misconceptions\n- Practical applications\nAssume I have [BACKGROUND_LEVEL] background knowledge."
  },
  DECISION_HELP: {
    name: "Decision Helper",
    template: "I'm trying to decide between [OPTION1] and [OPTION2] for [PURPOSE]. My priorities are:\n1. [PRIORITY1]\n2. [PRIORITY2]\n3. [PRIORITY3]\nPlease analyze both options based on these priorities and recommend the best choice with your reasoning."
  },
  ARTICLE_WRITING: {
    name: "Article Content Creation",
    template: "Write a comprehensive article about [TOPIC] for [TARGET_AUDIENCE]. The article should:\n- Have an engaging headline that captures attention\n- Include an introduction that hooks the reader\n- Cover these key points: [KEY_POINT_1], [KEY_POINT_2], [KEY_POINT_3]\n- Be approximately [WORD_COUNT] words\n- Use a [FORMAL/CONVERSATIONAL/EDUCATIONAL] tone\n- Include a call-to-action encouraging readers to [DESIRED_ACTION]\n\nThe article should position our brand as [BRAND_POSITIONING] and align with our value proposition of [VALUE_PROPOSITION]."
  },
  COLD_EMAIL: {
    name: "Cold Email Outreach",
    template: "Write a cold email to [TARGET_PERSONA] at [COMPANY_TYPE] companies. The email should:\n- Have a compelling subject line that achieves [GOAL_OF_SUBJECT_LINE]\n- Open with a personalized hook related to [RECIPIENT_PAIN_POINT/ACHIEVEMENT]\n- Briefly introduce our [PRODUCT/SERVICE] as a solution to [SPECIFIC_PROBLEM]\n- Include 1-2 relevant social proof points or statistics\n- Have a clear, low-friction call-to-action asking for [SPECIFIC_NEXT_STEP]\n- Be under 200 words\n\nThe tone should be [PROFESSIONAL/FRIENDLY/DIRECT] and avoid sounding generic or sales-heavy."
  },
  FOLLOW_UP_EMAIL: {
    name: "Follow-up Email",
    template: "Write a follow-up email to [RECIPIENT_NAME] who [CONTEXT_OF_PREVIOUS_INTERACTION] about [TOPIC/PRODUCT/SERVICE] on [DATE_OF_LAST_CONTACT]. In this follow-up:\n- Reference our previous conversation\n- Provide [NEW_VALUE/INFORMATION] that wasn't covered before\n- Gently remind them about [KEY_BENEFIT] they showed interest in\n- Ask if they've made progress on [DECISION/NEXT_STEP_PREVIOUSLY_DISCUSSED]\n- Suggest a specific next step or offer assistance with [POTENTIAL_OBSTACLE]\n\nKeep the email concise (3-4 short paragraphs) and maintain a [HELPFUL/PROFESSIONAL/FRIENDLY] tone without being pushy."
  },
  SOCIAL_MEDIA_POST: {
    name: "Social Media Content",
    template: "Create a series of [PLATFORM] posts about [TOPIC/PRODUCT/ANNOUNCEMENT] targeting [TARGET_AUDIENCE]. Each post should:\n- Have an attention-grabbing opener\n- Communicate [KEY_MESSAGE] clearly and concisely\n- Include relevant hashtags like [HASHTAG1], [HASHTAG2]\n- End with an engaging question or clear call-to-action\n\nThe posts should align with our brand voice which is [BRAND_VOICE_CHARACTERISTICS] and should be optimized for [PLATFORM]'s best practices. Consider incorporating [TRENDING_TOPIC/CURRENT_EVENT] if relevant."
  },
  PRODUCT_DESCRIPTION: {
    name: "Product Description",
    template: "Write a compelling product description for [PRODUCT_NAME], a [BRIEF_PRODUCT_DESCRIPTION] that helps [TARGET_CUSTOMER] with [PAIN_POINT/NEED]. Include:\n- An attention-grabbing headline\n- 2-3 paragraphs highlighting the key features and benefits\n- Bullet points listing technical specifications: [SPEC1], [SPEC2], [SPEC3]\n- At least three benefit statements that connect features to customer outcomes\n- Social proof element (awards, testimonials, ratings)\n- Clear pricing information and purchase options\n\nThe tone should be [PROFESSIONAL/CONVERSATIONAL/LUXURY/TECHNICAL] and should emphasize our unique selling proposition of [USP]."
  },
  AD_COPY: {
    name: "Advertising Copy",
    template: "Create [PLATFORM] ad copy for our [PRODUCT/SERVICE] targeting [TARGET_AUDIENCE] with [PAIN_POINT/DESIRE]. The ad should:\n- Have a headline under [CHARACTER_LIMIT] characters that creates urgency or curiosity\n- Include [VALUE_PROPOSITION] clearly in the first few lines\n- Highlight [PRIMARY_BENEFIT] and [SECONDARY_BENEFIT]\n- Address common objection: [OBJECTION]\n- End with a clear call-to-action: [CTA]\n\nIncorporate these keywords naturally: [KEYWORD1], [KEYWORD2]. The overall tone should be [URGENT/FRIENDLY/PROFESSIONAL/CONVERSATIONAL] and align with our campaign goal of [CAMPAIGN_GOAL]."
  },
  SALES_PITCH: {
    name: "Sales Pitch Script",
    template: "Create a sales pitch script for [PRODUCT/SERVICE] when speaking with [DECISION_MAKER_TITLE] at [COMPANY_TYPE] companies. The pitch should:\n- Open with a compelling hook about [INDUSTRY_CHALLENGE/TREND]\n- Transition to how our solution addresses [SPECIFIC_PAIN_POINT]\n- Include these key differentiators: [DIFFERENTIATOR1], [DIFFERENTIATOR2]\n- Incorporate customer success story about [SIMILAR_CUSTOMER] who achieved [SPECIFIC_RESULT]\n- Include responses to these common objections: [OBJECTION1], [OBJECTION2]\n- End with a clear next step question that is easy to say yes to\n\nThe pitch should be conversational, last approximately [TIME_LENGTH] minutes, and focus on business outcomes rather than just features."
  },
  CASE_STUDY: {
    name: "Case Study Framework",
    template: "Create an outline for a case study about how [CLIENT_NAME], a [CLIENT_DESCRIPTION], used our [PRODUCT/SERVICE] to solve [PROBLEM/CHALLENGE]. The case study should include:\n- A compelling title that highlights the primary result\n- Company background section (1 paragraph)\n- Challenge section detailing [SPECIFIC_CHALLENGE] and its business impact\n- Solution section explaining why they chose us over [COMPETITOR/ALTERNATIVE] and the implementation process\n- Results section with specific metrics: [METRIC1], [METRIC2], [METRIC3]\n- 1-2 direct quotes from [STAKEHOLDER_TITLE] about the experience\n- Conclusion with future plans or additional benefits discovered\n\nThe tone should be factual and professional while telling a compelling story that similar prospects would relate to."
  },
  NEWSLETTER: {
    name: "Email Newsletter",
    template: "Create an email newsletter for [AUDIENCE_SEGMENT] focused on [NEWSLETTER_THEME]. The newsletter should include:\n- An engaging subject line that promises specific value\n- Personal greeting and brief introduction (2-3 sentences)\n- Main content section covering: [TOPIC1], [TOPIC2], [TOPIC3]\n- A 'featured content' section highlighting [RECENT_ARTICLE/RESOURCE/PRODUCT]\n- An industry insight or tip section providing actionable advice about [RELEVANT_TOPIC]\n- Clear call-to-action for [DESIRED_NEXT_STEP]\n- Brief company news or update section (optional)\n\nThe newsletter should be scannable with clear headings, maintain a [FRIENDLY/PROFESSIONAL/EDUCATIONAL] tone, and provide genuine value while subtly promoting our [PRODUCT/SERVICE/BRAND]."
  }
};

interface PromptTemplatesTabProps {
  onSelectTemplate: (template: string) => void;
}

const PromptTemplatesTab: React.FC<PromptTemplatesTabProps> = ({ onSelectTemplate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prompt Templates</CardTitle>
        <CardDescription>
          Use these templates as starting points for common prompt types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(PROMPT_STYLES).map(([key, { name, template }]) => (
            <Card key={key} className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm bg-slate-50 p-3 rounded mb-3 whitespace-pre-line">{template}</p>
                <Button
                  size="sm"
                  onClick={() => onSelectTemplate(template)}
                  className="w-full"
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptTemplatesTab;
