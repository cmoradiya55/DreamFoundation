import React from 'react';

const schoolDisciplineRules = [
    'Children must reach school by 9:00 a.m. If a child is late more than three times, they will be sent back home. Parents are requested to ensure regular attendance and must pick up their child at 11:30 a.m. sharp.',
    'Send the school bag, diary, water bottle, tiffin, and an extra pair of labelled clothes daily. The school cannot be held responsible for lost belongings that are not labelled. An ID card must also be worn.',
    'Inform the school in advance if you need to pick up your child early.',
    'Check the child’s bag every day for notes or messages from the school.',
    'Only simple dressing and sandals without laces are allowed. Sandals should be easy for the child to manage independently. Watches, bangles, and chains are not permitted.',
    'Children must wear the school T-shirt on every field trip and on all Fridays.',
    'Submit a leave note if the child is absent for more than three days.',
    'The school issues one report card per year.',
    'Anyone picking up a child must be known to the school. Inform the school if a new driver or helper will come; otherwise, the school is not responsible for any misunderstanding.',
    'Although the management prioritises safety during school hours and excursions, it is not liable for any accident, injury, or mishap that may occur.',
    'Park vehicles responsibly to avoid blocking neighbours and creating traffic. Refrain from honking and park a little away from the school gate.',
    'Parents, adults, maids, and drivers must wait outside the main gate while dropping off or picking up children.',
    'Teacher interaction time is Fridays at 11:30 a.m. only. Please avoid routine-day queries unless there is an emergency.',
];

const admissionRules = [
    'New admissions are offered only when vacancies are available.',
    'Parents and guardians may not dictate terms to the management. The management reserves the right to decide the conditions for admitting or retaining pupils.',
    'After admission into Play School or Nursery, term fees are neither refundable nor transferable, irrespective of personal reasons. Please avoid contacting the management for exceptions.',
    'Fees must be paid twice a year for the June–November and December–May terms. Late payments will incur additional charges.',
    'Report cards are issued only after all dues are cleared in full.',
];

const generalInstructions = [
    'Notify the school about any change in address or telephone number.',
    'The management may add, alter, or amend these rules. All updates are binding on parents and pupils.',
    'The school remains closed on public holidays, bank holidays, festivals, and in instances of riots, bandhs, heavy rainfall, or any sudden unforeseen circumstances.',
    'Inform the school immediately if your child has allergies or requires specific medication.',
];

const Section: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <section className="rounded-2xl border border-teal-200/70 bg-white p-6 shadow-lg">
        <div className="mb-4">
            {/* <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">Section</p> */}
            <h2 className="text-xl font-semibold text-teal-600">{title}</h2>
        </div>
        <ol className="space-y-3 text-sm leading-tight">
            {items.map((item, index) => (
                <li key={item} className="flex gap-3">
                    <span className="font-semibold text-teal-600">{index + 1}.</span>
                    <p className="text-black">{item}</p>
                </li>
            ))}
        </ol>
    </section>
);

const StudentTermsAndConditionsComponent: React.FC = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 px-4 py-10">
            <div className="mx-auto max-w-3xl space-y-8">
                <header className="rounded-2xl border border-teal-200 bg-white p-8 text-teal-600 shadow-lg">
                    {/* <p className="text-xs uppercase tracking-[0.3em] text-black">
                        Pre-School
                    </p> */}
                    <h1 className="mt-2 text-2xl font-semibold">Rules & Regulations</h1>
                    <p className="mt-3 text-sm text-black">
                        Please review the school discipline guidelines, admission rules, and general
                        instructions carefully. These policies ensure a safe, respectful, and well-organised
                        environment for every child at Dream Foundation.
                    </p>
                </header>

                <div className="space-y-6">
                    <Section title="School Discipline" items={schoolDisciplineRules} />
                    <Section title="Admissions" items={admissionRules} />
                    <Section title="General Instruction" items={generalInstructions} />
                </div>
            </div>
        </main>
    );
};

export default StudentTermsAndConditionsComponent;