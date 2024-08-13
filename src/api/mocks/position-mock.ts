import { http, HttpResponse } from 'msw'

type PositionResponse = {
  html_url: string
  title: string
  created_at: string | Date
  comments: number
  body: string
}

const position: PositionResponse = {
  html_url: 'https://example.com/jobs/frontend-developer',
  title: 'Front-End Developer',
  created_at: '2024-08-10T14:30:00Z',
  comments: 12,
  body: '# Front-End Developer\n\n**Location:** Remote\n\n**Company:** Tech Innovators Inc.\n\n## Job Description\nWe are looking for a passionate and skilled Front-End Developer to join our dynamic team. You will be responsible for creating and maintaining responsive web applications, ensuring an exceptional user experience.\n\n### Key Responsibilities:\n- Develop and optimize web applications using HTML, CSS, and JavaScript.\n- Collaborate with UI/UX designers to translate designs into functional user interfaces.\n- Implement best practices for web performance, accessibility, and SEO.\n- Debug and resolve front-end issues.\n- Work closely with back-end developers to integrate APIs.\n\n### Requirements:\n- Proficiency in HTML, CSS, and JavaScript.\n- Experience with front-end frameworks such as React, Angular, or Vue.js.\n- Knowledge of version control systems (e.g., Git).\n- Understanding of responsive design principles.\n- Strong problem-solving skills and attention to detail.\n\n### Nice to Have:\n- Experience with TypeScript.\n- Familiarity with modern build tools like Webpack or Parcel.\n- Exposure to Agile/Scrum methodologies.\n\n## How to Apply\nPlease submit your resume and portfolio [here](https://example.com/apply).\n\n**Deadline:** August 31, 2024\n\nWe look forward to hearing from you!',
}

export const positionMock = http.get<never, never, PositionResponse>(
  '/repos/frontendbr/vagas/issues/:issueNumber',
  async () => {
    return HttpResponse.json(position)
  },
)
