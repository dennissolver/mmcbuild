Conversation opened. 6 messages. All messages read.

Skip to content
Using Corporate AI Solutions Mail with screen readers
prd 

1 of many
Re: Karen Re: MMC Build Brief
External
Inbox

AI Overview
Dennis proposed an alternative, simpler tech stack for the MMC Build MVP to reduce cost and complexity.
Karen requested a meeting with Dennis and her co-founder, Karthik, to discuss the proposal.
Dennis requested to adjust the scheduled meeting time of 3:00 PM by one hour either way.
Karen agreed to move the meeting to 4:00 PM today (Feb 24th) and sent a modified Zoom link.
By Gemini; there may be mistakes. Learn more

Karen Van Den Engel <karen.engel@mmcbuild.com.au>
Fri 20 Feb, 09:26 (9 days ago)
to me

Hi Dennis,

Thank you for your email and proposed delivery option.  Could my technical cofounder and myself meet with you Tuesday after 3:00pm?

Regards 
Karen

On Thu, 19 Feb 2026 at 9:28 am, Corporate AI Solutions <dennis@corporateaisolutions.com> wrote:
Hi Karen,

Thank you for the opportunity to quote on the MMC Build MVP — it was great connecting last week and I can see the enormous potential in what you're building for the Australian construction sector.

I've reviewed the PRD v3.0 and have a strong handle on the functional requirements across all five modules (Comply, Build, Quote, Direct, and Train). 

Before I put together a formal quotation, I'd like to raise some observations about the architecture specified in Section 4 that I think could meaningfully impact your timeline, budget, and risk profile.

The PRD currently specifies a fairly heavyweight infrastructure stack — FastAPI (Python) as a separate backend server, AWS ECS/Fargate for container orchestration, Celery workers with SQS for job queues, managed OpenSearch, Redis, EventBridge, and Terraform for infrastructure-as-code. This is a proven enterprise architecture, but for an MVP targeting 5–10 pilot firms, it introduces significant complexity and cost before you've validated product-market fit.

I'd like to propose an alternative stack for the MVP (that still has significant scalability for production) that delivers every functional requirement in the PRD while being simpler, faster to build, cheaper to run, and easier to maintain:

• Vercel (hosting & serverless compute) — purpose-built for Next.js, which the PRD already specifies for the frontend. API routes and server actions eliminate the need for a separate FastAPI backend server entirely.

• Supabase (database, auth, storage, realtime) — built on open-source PostgreSQL with pgvector already available as a native extension. This covers your relational data, vector search for RAG, authentication with row-level security for multi-tenant RBAC, file storage for plan uploads and reports, and realtime subscriptions for job status updates — all from a single managed service.

• Inngest or Trigger.dev (async job orchestration) — handles your long-running AI pipelines (plan parsing → RAG → LLM → report generation) with built-in retries, logging, and step functions. Replaces the need for Celery, SQS, and custom worker infrastructure.

• Stripe integration via Next.js API routes — no change to your billing approach.

The practical benefits for the MVP:

• Faster delivery — I'd focus on building product features (compliance engine, RAG pipeline, training modules) rather than provisioning and configuring infrastructure. I'd estimate this approach saves 4–6 weeks of pure infrastructure work.

• Lower running costs — Vercel Pro and Supabase Pro together run approximately $50–75/month at MVP scale versus $300–500+/month for an always-on ECS/Fargate setup with managed Redis, OpenSearch, and associated AWS services.

• Fewer failure points — a separate backend server, container orchestration layer, message broker, and cache layer each introduce operational complexity and potential breakpoints. The Vercel + Supabase approach reduces the number of independently managed services from roughly 8–10 down to 3–4.

• Simpler team requirements — our developers work in one language (TypeScript) across frontend and backend rather than maintaining both TypeScript and Python codebases.

• No vendor lock-in — this is important. Next.js is open source and runs anywhere. Supabase is open-source PostgreSQL — your data and schema can migrate to AWS RDS or self-hosted Postgres at any time with no application changes.

• AU data residency — Supabase offers a Sydney database region and Vercel's edge network serves from Sydney, satisfying the residency requirements in the PRD.

Critically, this doesn't close any doors. The PRD already identifies private VPC deployments and enterprise-grade isolation as post-MVP (Section 4.9). When those enterprise triggers are hit — and they'd be driven by paying customers with specific requirements — you migrate the parts that need it to AWS. That's a funded, justified migration rather than a speculative one.

I should note that the R&D Tax Rebate eligibility is unaffected by this architecture choice — the qualifying criteria relate to the ABN and location of the developers, not the hosting platform (and the entity I'd use Global Buildtech Australia Pty Ltd) fits the qualifying criteria for the R & D tax rebate framework.

I'd welcome the opportunity to walk through this with you and your technical co-founder in more detail. Let's discuss the trade-offs and see if this approach gets you to market faster with lower risk, while keeping the path to enterprise scale fully open.

I'm available for a follow-up call when convenient


Looking forward to continuing the conversation.

Thank you

DENNIS MCMAHON
M: +61402612471           
E: mcmdennis@gmail.com    W: www.global-buildtech.com
L: https://www.linkedin.com/in/denniskl/ 


ACN 672395685                           ABN 54672395685



https://factory2key.com.au/        https://factory2key.com.au/checkpoint/



About Prefab (Granny Flats to Lodges)
https://www.youtube.com/watch?v=D6AZNn921C0
https://www.youtube.com/watch?v=IIoCWTbvitk
https://photos.app.goo.gl/xCwfHee1d1iL4eUk8 

Prefab Lodge Assembly
https://youtu.be/i8LERoVsxgE








On Tue, 17 Feb 2026 at 17:46, Karen Van Den Engel <karen.engel@mmcbuild.com.au> wrote:
Hi Dennis,

It was great meeting with you (virtually) last week and discussing our common interest - the MMC market.  I told you all about my new project MMC Build, where we are looking to develop an AI application designed to assist the Australian construction industry embrace MMC methods and products.  We have received quotations from several other software development companies to build this application but I think you are in a better position to understand the subject matter and requirements so we would like you to also provide us with a quote for the build.

I have attached the PRD that was also provided to the other developers to maintain a fair tendering process.  Remember that as we are applying for the R&D Tax Rebate that all software developers must be employed under an Australian ABN and be located in Australia to qualify.

We understand if you need to meet again with my technical co-founder and myelf again to answer any questions before providing us with a quotation.  Please let me know some times and we can work out which one suits all.

Regards,

Karen Van Den Engel
Founder & CEO
MMC Build
Ph:  0404 394 225
www.mmcbuild.com.au




Sincerely,
The MMC Build Team

E: info@mmcbuild.com.au
W: www.mmcbuild.com.au


Sincerely,
The MMC Build Team

E: info@mmcbuild.com.au
W: www.mmcbuild.com.au

Attachments area
Preview YouTube video CLT granny flat home built in Logan, Brisbane by Global Tech Australia Pty LtdPreview YouTube video CLT granny flat home built in Logan, Brisbane by Global Tech Australia Pty Ltd

Preview YouTube video Tour of the Prefabricated CLT -cross laminated timber framed granny flat for faster build AustraliaPreview YouTube video Tour of the Prefabricated CLT -cross laminated timber framed granny flat for faster build Australia


Dennis McMahon <dennis@corporateaisolutions.com>
Fri 20 Feb, 09:39 (9 days ago)
to Dennis, Karen

Hi Karen

Sure

Set a time that suits

Thank you

Dennis McMahon
INNOVATOR | Corporate AI Solutions

www.corporateaisolutions.com

“Wisdom in AI comes from sharing what we know, discovering what we need, and unlocking results together.”

 

M: +61402612471 (Whatsapp)        

E: dennis@corporateaisolutions.com


Turning Industry Insight into AI Action

Karen Van Den Engel
Mon 23 Feb, 16:18 (6 days ago)
Hi Dennis, My Technical Co-founder (Karthik Rao) and myself would like organise a meeting time with you for tomorrow afternoon if you are available to discuss y

Dennis McMahon <dennis@corporateaisolutions.com>
Tue 24 Feb, 09:24 (5 days ago)
to Dennis, Karen, me

Hi Karen

My apologies, is it possible to either push this back an hour or bring it forward an hour?




Thank you

Dennis McMahon
INNOVATOR | Corporate AI Solutions

www.corporateaisolutions.com

“Wisdom in AI comes from sharing what we know, discovering what we need, and unlocking results together.”

 

M: +61402612471 (Whatsapp)        

E: dennis@corporateaisolutions.com


Turning Industry Insight into AI Action

Karen Van Den Engel
Tue 24 Feb, 10:15 (5 days ago)
to Karthik, me

Hi Dennis,

We can do 4:00pm today and modified the meeting link below.

Karen Van Den Engel is inviting you to a scheduled Zoom meeting.

Topic: MMC Build AI Development Discussion
Time: Feb 24, 2026 04:00 PM Canberra, Melbourne, Sydney
Join Zoom Meeting
https://us05web.zoom.us/j/84626597432?pwd=QPnWHLhKRJM1zKlacF0xrUOane76Wp.1

Meeting ID: 846 2659 7432
Passcode: q4yHxn

Regards,

Karen

Dennis McMahon <dennis@corporateaisolutions.com>
Tue 24 Feb, 10:30 (5 days ago)
to Karen


Thank you Karen, talk then

Dennis McMahon
INNOVATOR | Corporate AI Solutions

www.corporateaisolutions.com

“Wisdom in AI comes from sharing what we know, discovering what we need, and unlocking results together.”

 

M: +61402612471 (Whatsapp)        

E: dennis@corporateaisolutions.com


Turning Industry Insight into AI Action
karen.engel@mmcbuild.com.au prd isn