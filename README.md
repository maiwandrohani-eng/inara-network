# INARA Network Platform

**The International Network for Aid, Relief and Assistance**

A comprehensive coordination platform connecting humanitarian organizations worldwide to collaborate on relief efforts, share resources, and maximize impact in crisis response and development initiatives. Built specifically for INARA's operational needs with complete membership management, capacity building, funding support, and network coordination features.

## 🌍 About

The INARA Network platform enables humanitarian organizations to:

- **Join the Network**: Streamlined application process with document submission and review
- **Three Membership Types**: Core Members (INARA coordinating body), Organizational Members (NGOs, healthcare institutions), and Individual Members (medical professionals, humanitarian workers)
- **Membership Tiers**: Core, Full, Associate, and Observer memberships with different benefits
- **Connect & Collaborate**: Network with verified humanitarian organizations globally
- **Coordinate Projects**: Manage and coordinate relief and development projects
- **Share Resources**: Share equipment, supplies, expertise, and funding
- **Real-time Communication**: Forums, announcements, working groups, and mailing lists
- **Capacity Building**: Access training programs, assessments, and certifications
- **Funding Support**: Find funding opportunities, get proposal development support
- **Track Impact**: Monitor network impact with comprehensive analytics
- **Regional Coordination**: Regional hubs with coordinators and focal points
- **Document Library**: Access templates, guidelines, and best practices
- **Events Management**: Participate in workshops, conferences, and webinars

## 🚀 Features

### 1. **Operationalizing the Network**

- **Member Onboarding**: Complete application workflow from submission to approval
- **Membership Tiers**: Core, Full, Associate, and Observer memberships
- **Member Types**: Support for Core (INARA), Organizational (NGOs, institutions), and Individual (professionals) members
- **Regional Coordination**: Regional hubs with coordinators and focal points
- **Coordination Meetings**: Track network-wide and regional coordination meetings
- **Network Directory**: Searchable directory of all member organizations and individuals

### 2. **Application Process**

- **Multi-Stage Review**: Submitted → Under Review → Document Review → Eligibility Check → Approved/Rejected
- **Document Submission**: Upload registration certificates, financial statements, project lists, work samples, policies
- **Review System**: Admin panel for reviewing applications with notes and stage tracking
- **Approval Workflow**: Automated member activation upon approval
- **Reference Checks**: Collect and manage references
- **Status Tracking**: Real-time application status updates

### 3. **Services Provided by INARA**

- **Technical Assistance & Consulting**: One-on-one expert consultations
- **Training Programs**: Capacity building in governance, financial management, M&E, proposal writing
- **Grant Management Support**: End-to-end grant management assistance
- **Proposal Development**: Support for concept notes and full proposals
- **Monitoring & Evaluation**: M&E framework development and implementation support
- **Resource Mobilization**: Help finding and securing funding
- **Service Tracking**: Track who received what service and when
- **Impact Measurement**: Service utilization reports and feedback collection

### 4. **Institutional Development & Organizational Strengthening**

- **Capacity Assessments**: Comprehensive organizational capacity assessments
- **Assessment Areas**: Governance, Financial Health, Programmatic Capacity, HR, M&E
- **Improvement Plans**: Goal setting and milestone tracking based on assessments
- **Training Programs**: 
  - Governance & Leadership
  - Financial Management
  - Monitoring & Evaluation
  - Project Management
  - Proposal Writing & Fundraising
  - HR Management & Safeguarding
- **Training Tracking**: Participant registration, attendance, completion tracking
- **Certifications**: Issue certificates for training completion
- **Progress Monitoring**: Track organizational improvements over time

### 5. **Resource Mobilization & Funding Support**

- **Funding Opportunities Database**: Searchable grant and funding opportunities
- **Funder Types**: Bilateral, multilateral, foundations, corporate, UN agencies
- **Proposal Support Tracking**: Track INARA's support in proposal development
- **Donor Database**: Comprehensive database of potential donors
- **Success Tracking**: Record funding secured by members
- **Joint Fundraising**: Coordinate joint funding applications
- **Funding Received**: Track all funding secured by network members
- **Impact Attribution**: Track INARA's contribution to funding success

### 6. **Benefits for Network Members**

- **Member Benefits System**: Comprehensive benefits tracking
- **Benefit Categories**: 
  - Discounts on services
  - Access to exclusive resources and tools
  - Priority support
  - Enhanced visibility and networking
  - Free training access
- **Tier-Based Benefits**: Different benefits for different membership tiers
- **Certificates & Badges**: Achievement recognition system
- **Redemption Tracking**: Monitor benefit utilization
- **Points System**: (Can be implemented) Reward active participation

### Additional Core Features

- **Organization Management**
  - Organization profiles with comprehensive details
  - Multi-type support (NGO, INGO, UN Agencies, Healthcare Institutions, etc.)
  - Partnership management
  - Verification and approval system

- **Project Coordination**
  - Emergency response and development projects
  - Project lifecycle management
  - Priority levels and status tracking
  - Team member assignment
  - Progress updates and reporting

- **Resource Sharing**
  - Equipment, supplies, medicine, food, vehicles, technology, expertise
  - Availability tracking and location mapping
  - Resource allocation to projects

- **Events Management**
  - Workshops, conferences, webinars, training sessions
  - Registration and attendance tracking
  - Virtual and in-person event support
  - Event materials and recordings

- **Document Library**
  - Templates, guidelines, best practices, toolkits
  - Policy documents and procedures
  - Case studies and research reports
  - Version control and access management

- **Communication & Collaboration**
  - Forums and discussion boards
  - Announcement system with priority levels
  - Working groups for thematic areas
  - Mailing lists for targeted communication
  - Direct messaging

- **Comprehensive Reporting**
  - Network statistics and growth metrics
  - Member activity reports
  - Service utilization analysis
  - Impact metrics and beneficiary tracking
  - Funding success rates
  - Training participation and completion rates

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Maps**: Leaflet / React Leaflet
- **Forms**: React Hook Form with Zod validation

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd /Users/maiwand/inara-network
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your application URL (default: `http://localhost:3000`)
   - Email configuration for notifications
   - Optional: Map API keys for enhanced features

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name init

   # Optional: Seed with sample data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄 Database Schema

The platform uses a comprehensive data model with 40+ tables including:

### Core Models
- **Users**: Member accounts with roles, membership tiers, and professional profiles
- **Organizations**: Humanitarian organizations with verification and membership details
- **Applications**: Multi-stage application process with document management

### Services & Capacity Building
- **Service**: Services offered to members (technical assistance, consulting, etc.)
- **ServiceUtilization**: Track service delivery and impact
- **Training**: Capacity building programs and courses
- **TrainingParticipant**: Training enrollment and completion tracking
- **Assessment**: Organizational capacity assessments
- **ImprovementPlan**: Action plans based on assessments
- **Milestone**: Trackable goals and achievements
- **Certificate**: Certificates, badges, and accreditations

### Funding & Resources
- **FundingOpportunity**: Grant and funding opportunities database
- **ProposalSupport**: Track INARA's proposal development support
- **FundingReceived**: Success tracking of secured funding
- **Donor**: Comprehensive donor database
- **Resource**: Shareable resources (equipment, supplies, expertise)
- **Project**: Relief and development projects
- **ProjectMember**: Team assignments
- **ProjectResource**: Resource allocation

### Events & Learning
- **Event**: Workshops, conferences, webinars, meetings
- **EventParticipant**: Event registration and attendance
- **Document**: Templates, guidelines, toolkits, best practices
- **CoordinationMeeting**: Network and regional coordination meetings

### Communication
- **Forum**: Discussion forums by topic
- **ForumPost**: Forum discussions
- **ForumComment**: Threaded comments
- **Announcement**: Network-wide announcements
- **Message**: Direct messaging
- **WorkingGroup**: Thematic working groups
- **WorkingGroupMember**: Working group membership
- **MailingList**: Email distribution lists

### Regional Coordination
- **Region**: Geographic regions for network coordination
- **Coordination**: Regional coordinators and focal points
- **CoordinationMeeting**: Regional and thematic meetings

### Member Benefits
- **MemberBenefit**: Benefits available to members
- **BenefitRedemption**: Track benefit usage
- **Partnership**: Inter-organization partnerships

### System
- **Activity**: Audit trail and activity logging
- **Notification**: User notifications

## 🔐 Authentication & Authorization

- Secure password hashing with bcrypt
- JWT-based session management
- Role-based access control (Admin, Coordinator, Member, Viewer)
- Organization-level permissions
- Email verification support

## 🌐 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Applications (Admin)
- `GET /api/applications` - List applications (with filters)
- `POST /api/applications` - Submit new application
- `PATCH /api/applications/[id]` - Approve/reject application

### Organizations
- `GET /api/organizations` - List organizations (with filters)
- `POST /api/organizations` - Create organization
- `GET /api/organizations/[slug]` - Get organization details
- `PATCH /api/organizations/[slug]` - Update organization

### Projects
- `GET /api/projects` - List projects (with filters)
- `POST /api/projects` - Create project
- `GET /api/projects/[slug]` - Get project details
- `PATCH /api/projects/[slug]` - Update project

### Resources
- `GET /api/resources` - List resources (with filters)
- `POST /api/resources` - Add resource
- `PATCH /api/resources/[id]` - Update resource

### Services (Admin)
- `GET /api/services` - List services
- `POST /api/services` - Create service
- `PATCH /api/services/[id]` - Update service
- `POST /api/services/[id]/request` - Request service

### Training (Admin)
- `GET /api/training` - List training programs
- `POST /api/training` - Create training
- `POST /api/training/[id]/register` - Register for training

### Funding Opportunities (Admin)
- `GET /api/funding-opportunities` - List opportunities
- `POST /api/funding-opportunities` - Create opportunity
- `POST /api/funding-opportunities/[id]/proposal` - Submit proposal support request

### Events (Admin)
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `POST /api/events/[id]/register` - Register for event

### Documents (Admin)
- `GET /api/documents` - List documents
- `POST /api/documents` - Upload document
- `DELETE /api/documents/[id]` - Delete document

### Forums
- `GET /api/forums` - List forums
- `POST /api/forums/[id]/posts` - Create post
- `POST /api/forums/posts/[id]/comments` - Add comment

### Admin Panel Routes
- All admin routes require ADMIN or SUPER_ADMIN role
- Full CRUD operations for all entities
- Bulk operations support
- Advanced filtering and search

## 📱 Pages

### Public Pages
- `/` - Homepage with platform overview
- `/organizations` - Browse humanitarian organizations
- `/projects` - Explore relief and aid projects
- `/resources` - Discover shared resources
- `/auth/signin` - User login
- `/auth/signup` - User registration

### Member Pages
- `/dashboard` - Member dashboard with stats and activities
- `/profile` - User profile management
- `/services` - Browse and request services
- `/training` - Available training programs
- `/funding` - Funding opportunities
- `/events` - Upcoming events and webinars
- `/documents` - Document library
- `/forums` - Discussion forums
- `/working-groups` - Join working groups

### Admin Panel Pages
- `/admin` - Admin dashboard with overview
- `/admin/applications` - Review membership applications
- `/admin/members` - Manage members and organizations
- `/admin/services` - Manage services provided
- `/admin/training` - Create and manage training programs
- `/admin/funding` - Post funding opportunities
- `/admin/events` - Organize events
- `/admin/documents` - Manage document library
- `/admin/forums` - Moderate forums
- `/admin/announcements` - Create announcements
- `/admin/benefits` - Manage member benefits
- `/admin/regions` - Manage regional coordination
- `/admin/reports` - View comprehensive reports
- `/admin/settings` - Platform settings

All admin pages include full CRUD operations (Create, Read, Update, Delete) for their respective entities.

## 🎨 Customization

### Styling
The platform uses Tailwind CSS with a custom theme. Modify `tailwind.config.ts` to customize:
- Colors (primary, secondary palettes)
- Typography
- Spacing
- Breakpoints

### Branding
Update the following files:
- `app/layout.tsx` - Site metadata and title
- `components/Header.tsx` - Logo and navigation
- `public/` - Add your logos and images

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Database Migration

```bash
npx prisma migrate deploy
```

### Environment Variables

Ensure all production environment variables are set:
- Database URL
- NextAuth configuration
- SMTP settings
- API keys

### Recommended Platforms

- **Vercel**: Optimal for Next.js (automatic deployments)
- **Railway**: Easy PostgreSQL + Next.js deployment
- **DigitalOcean**: App Platform or Droplets
- **AWS**: ECS, Elastic Beanstalk, or Amplify

## 📊 Future Enhancements

- [ ] Real-time chat with Socket.IO
- [ ] Advanced mapping with crisis zones and resource distribution
- [ ] Mobile app (React Native)
- [ ] AI-powered resource matching
- [ ] Integration with external aid databases (OCHA, ReliefWeb)
- [ ] Video conferencing integration for meetings
- [ ] Advanced analytics with data visualization
- [ ] Multi-language support (i18n) - Arabic, French, Spanish
- [ ] Email notification system for all activities
- [ ] SMS alerts for critical updates
- [ ] File storage integration (AWS S3, Azure Blob)
- [ ] Payment processing for paid services (optional)
- [ ] API for third-party integrations
- [ ] Mobile-responsive admin panel
- [ ] Export functionality for all reports (PDF, Excel)
- [ ] Automated application scoring
- [ ] Recommendation engine for partnerships
- [ ] Calendar synchronization
- [ ] Knowledge base / Help center
- [ ] Automated training reminders
- [ ] Certificate verification portal

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For questions or support:
- Email: support@inara-network.org
- Documentation: [docs.inara-network.org](https://docs.inara-network.org)
- Community Forum: [forum.inara-network.org](https://forum.inara-network.org)

## 🙏 Acknowledgments

Built to support the global humanitarian community in their mission to provide aid, relief, and assistance to communities in need.

---

**The International Network for Aid, Relief and Assistance**
*Connecting organizations, coordinating efforts, changing lives.*
