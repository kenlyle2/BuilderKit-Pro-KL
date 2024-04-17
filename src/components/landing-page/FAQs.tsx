'use client';
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PlusIcon from '@/assets/icons/PlusIcon';
import MinusIcon from '@/assets/icons/MinusIcon'; // Import your MinusIcon component

const accordionData = [
  {
    value: '0',
    question: 'Lorem ipsum dolor sit amet?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    value: '1',
    question: 'Lorem ipsum dolor sit amet?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    value: '2',
    question: 'Lorem ipsum dolor sit amet?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const FAQs = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (value: string) => {
    setOpenAccordion(value === openAccordion ? null : value);
  };

  return (
    <div id='faq' className='space-y-16 mt-44'>
      <div className='space-y-5 px-4'>
        <h1 className='text-center text-5xl md:text-[56px] font-medium leading-[56px] pricing-header '>
          Need help?
        </h1>
        <p className='text-[#C8C8C8] text-center text-lg md:text-xl not-italic font-normal leading-8 max-w-3xl mx-auto'>
          Don't worry, we got you. Here are some answers for your questions.
        </p>
      </div>
      <div className='max-w-5xl mx-auto'>
        <Accordion type='single' collapsible className='w-full'>
          {accordionData.map((item, index) => (
            <AccordionItem key={index} value={item.value} className='px-5'>
              <AccordionTrigger onClick={() => toggleAccordion(item.value)}>
                <div className='flex items-center gap-4 text-base md:text-lg not-italic font-medium leading-7 text-white '>
                  {openAccordion === item.value ? <MinusIcon /> : <PlusIcon />} {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent
                className={`text-gray-600 text-base not-italic font-normal leading-8 ml-11 transition-max-height duration-300 ease-in-out ${openAccordion === item.value ? 'max-h-screen' : 'max-h-0'}`}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
