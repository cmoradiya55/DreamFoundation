import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Users,
  ClipboardCheck,
  Clock,
  ShieldCheck,
  BriefcaseBusiness,
  PenLine,
} from 'lucide-react';

const eligibilitySections = [
  {
    title: 'Educational Qualification',
    icon: GraduationCap,
    points: [
      'Minimum requirement: Graduate in any discipline (Early Childhood Education or Psychology preferred).',
      'English fluency—both spoken and written—is mandatory for classroom communication.',
    ],
  },
  {
    title: 'Experience',
    icon: BriefcaseBusiness,
    points: [
      'At least 1 year of teaching experience in a preschool or early learning setup is preferred.',
      'Freshers with exceptional communication skills and creativity are welcome to apply.',
    ],
  },
  {
    title: 'Skills & Qualities',
    icon: Sparkles,
    points: [
      'Warm, patient, and caring approach toward young children.',
      'Strong communication skills with confident classroom management.',
      'Ability to design engaging, activity-based learning experiences.',
      'Team spirit and willingness to participate in all school events.',
    ],
  },
];

const termsConditions = [
  {
    title: 'Working Hours',
    icon: Clock,
    details: [
      'Monday to Friday: 8:30 a.m. – 1:00 p.m.',
      'Saturdays may be working as per the school calendar or special events.',
    ],
  },
  {
    title: 'Probation Period',
    icon: ClipboardCheck,
    details: [
      'All new teachers serve a probation period of 3 months.',
      'Confirmation depends on performance, punctuality, and professional conduct.',
    ],
  },
  {
    title: 'Leave Policy',
    icon: PenLine,
    details: [
      '1 casual leave per month is available after confirmation.',
      'Planned leave requires prior approval; uninformed leave will result in salary deduction.',
    ],
  },
  {
    title: 'Confidentiality',
    icon: ShieldCheck,
    details: [
      'Maintain confidentiality for student records, parent information, and internal school policies at all times.',
    ],
  },
  {
    title: 'Discipline & Conduct',
    icon: Users,
    details: [
      'Professional behaviour and polite communication are mandatory.',
      'Mobile phones may not be used during class hours. Staff must follow the school’s hygiene and dress code guidelines.',
    ],
  },
  {
    title: 'Training & Meetings',
    icon: Users,
    details: [
      'Attendance is compulsory for all workshops, trainings, and parent meetings scheduled by the school.',
    ],
  },
  {
    title: 'Termination',
    icon: ShieldCheck,
    details: [
      'Either party must provide one month’s notice or salary in lieu of notice.',
      'The school may terminate service for misconduct, repeated absenteeism, or unsatisfactory performance.',
    ],
  },
  {
    title: 'Safety & Childcare',
    icon: Sparkles,
    details: [
      'Teachers are responsible for the safety and emotional well-being of children under their care.',
      'No punishment, harsh language, or negligence will be tolerated.',
    ],
  },
];

const TeacherEligibilityCriteriaComponent: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-white px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl border border-teal-200 bg-white p-8 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-500">TinyYatra Pre-School</p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900">
            Teacher Eligibility Criteria & Terms
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            We invite dedicated mothers with a passion for early childhood education to join our
            vibrant learning community. Please review the eligibility requirements and service terms
            before applying.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1 text-sm font-semibold text-teal-700">
            <Users className="h-4 w-4" />
            Only mothers can apply
          </div>
        </header>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-teal-700">Eligibility Criteria</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {eligibilitySections.map(({ title, icon: Icon, points }) => (
              <article
                key={title}
                className="rounded-2xl border border-teal-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3 text-teal-700">
                  <Icon className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-teal-700 text-lg font-bold">•</span>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-teal-700">Terms &amp; Conditions</h2>
          <div className="space-y-4">
            {termsConditions.map(({ title, icon: Icon, details }, index) => (
              <article
                key={title}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {`Clause ${index + 1}`}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {details.map((detail) => (
                    <li key={detail} className="leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default TeacherEligibilityCriteriaComponent;