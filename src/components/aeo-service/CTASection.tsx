
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import ConsultationForm from './ConsultationForm';

const CTASection = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 aeo-gradient">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="heading-lg mb-6 text-white">Ready to Optimize Your Content for AI?</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Get your free AEO score today and discover how your content performs with AI systems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link to="/aeo/analyze">Get Your Free AEO Score</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent text-white border-white hover:bg-white/10"
            onClick={() => setShowConsultationForm(true)}
          >
            Schedule a Consultation <Calendar className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ConsultationForm 
        isOpen={showConsultationForm} 
        onClose={() => setShowConsultationForm(false)} 
      />
    </section>
  );
};

export default CTASection;
