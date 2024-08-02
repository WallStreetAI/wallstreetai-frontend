'use client';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import { DashboardCard } from '@/components/DashboardCard/DashboardCard';
import { ResumeSection } from '@/components/ResumeSection/ResumeSection';
import { useUserStore } from '@/store/store';
import { useUserData } from '@/hooks/useUserData';
import { useEffect } from 'react';

const cardList = [
  {
    title: 'Create your first resume',
    description: 'Craft a winning resume for your Wall Street ambitions!',
    bgColor: 'bg-card-blue',
    icon: '/cv.png',
    navigateTo: '/resumes',
  },
  {
    title: 'Resume analysis',
    description: 'Get your resume analyzed by our AI to improve your chances!',
    bgColor: 'bg-card-green',
    icon: '/score.png',
    navigateTo: '/resume-analysis',
  },
  {
    title: 'Career insights',
    description: 'Empower your career with insights from industry experts!',
    bgColor: 'bg-card-red',
    icon: '/insights.png',
    navigateTo: '/career-insights',
  },
  {
    title: 'Mock interviews',
    description: 'Prepare for your dream job with mock interviews!',
    bgColor: 'bg-card-purple',
    icon: '/interview.png',
    navigateTo: '/mock-interviews',
  },
];

export default function Dashboard() {
  const { updateUserId, updateResumeFiles, updateResumes, email } =
    useUserStore();
  const { data } = useUserData(email);

  useEffect(() => {
    if (data && data.user) {
      if (data.user.id) {
        updateUserId(data.user.id);
      }
      if (data.user.resumeFiles) {
        updateResumeFiles(data.user.resumeFiles);
      }
      if (data.user.resumes) {
        updateResumes(data.user.resumes);
      }
    }
  }, [data, data?.user]);

  return (
    <NavigationLayout>
      <ul className="mt-[100px] flex w-full max-w-[80vw] justify-between gap-3">
        {cardList.map((card) => (
          <a key={card.title} href={card.navigateTo}>
            <DashboardCard {...card} />
          </a>
        ))}
      </ul>
      <ResumeSection />
    </NavigationLayout>
  );
}
