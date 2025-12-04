# INARA Network - Database Structure Overview

## Complete Database Schema

The INARA Network platform includes **40+ database tables** organized around 6 core operational areas:

---

## 1. OPERATIONALIZING THE NETWORK

### Users & Membership
**Table: User**
- Complete user profiles with professional details
- Membership types: CORE, ORGANIZATIONAL, INDIVIDUAL
- Membership tiers: CORE, FULL, ASSOCIATE, OBSERVER
- Roles: SUPER_ADMIN, ADMIN, NETWORK_COORDINATOR, REGIONAL_COORDINATOR, MEMBER, VIEWER
- Tracks expertise areas, profession, bio
- Links to organizations

**Table: Organization**
- Comprehensive organization profiles
- Organization types: NGO, INGO, UN_AGENCY, GOVERNMENT, FAITH_BASED, COMMUNITY, HEALTHCARE_INSTITUTION, HUMANITARIAN_AGENCY
- Organization sizes: SMALL, MEDIUM, LARGE
- Statuses: PENDING, UNDER_REVIEW, APPROVED, ACTIVE, SUSPENDED, INACTIVE, REJECTED
- Tracks staff count, budget, operational regions
- Membership tier and dates

**Table: Region**
- Geographic regions for network coordination
- Lists of countries covered
- Assigned coordinators and focal points
- Tracks regional meetings

**Table: CoordinationMeeting**
- Network-wide and regional coordination meetings
- Types: REGIONAL_COORDINATION, NETWORK_WIDE, THEMATIC, EMERGENCY, PLANNING
- Tracks participants, agenda, minutes, action items
- Formats: IN_PERSON, ONLINE, HYBRID

**Table: Partnership**
- Inter-organization partnerships
- Types: STRATEGIC, OPERATIONAL, FUNDING, TECHNICAL, ADVOCACY
- Duration tracking

---

## 2. APPLICATION PROCESS

**Table: Application**
- Complete application workflow management
- Statuses: SUBMITTED, UNDER_REVIEW, ADDITIONAL_INFO_REQUIRED, APPROVED, REJECTED, WITHDRAWN
- Stages: DOCUMENT_REVIEW, ELIGIBILITY_CHECK, INTERVIEW, FINAL_APPROVAL, COMPLETED
- Document uploads:
  - Registration certificates
  - Financial statements
  - Project lists
  - Work samples (project reports)
  - Policies
  - Other documents
- Application letter and motivation statement
- Reference information
- Review notes and approval tracking
- Tracks reviewer and approver

---

## 3. SERVICES PROVIDED BY INARA

**Table: Service**
- Services offered to members
- Categories: TECHNICAL_ASSISTANCE, CONSULTING, GRANT_MANAGEMENT, PROPOSAL_DEVELOPMENT, MONITORING_EVALUATION, RESOURCE_MOBILIZATION, NETWORKING, ADVOCACY, CAPACITY_BUILDING, LEGAL_SUPPORT, FINANCIAL_MANAGEMENT
- Delivery modes: ONLINE, IN_PERSON, HYBRID, SELF_PACED
- Duration, objectives, prerequisites
- Materials and resources

**Table: ServiceUtilization**
- Tracks who received which service
- Can be for organizations or individuals
- Statuses: REQUESTED, APPROVED, IN_PROGRESS, COMPLETED, CANCELLED
- Request, start, and completion dates
- Feedback and ratings
- Impact measurement notes

**Table: Training**
- Capacity building training programs
- Categories: GOVERNANCE, FINANCIAL_MANAGEMENT, MONITORING_EVALUATION, PROJECT_MANAGEMENT, PROPOSAL_WRITING, FUNDRAISING, LEADERSHIP, COMMUNICATION, HR_MANAGEMENT, SAFEGUARDING, ACCOUNTABILITY, STRATEGIC_PLANNING
- Levels: BEGINNER, INTERMEDIATE, ADVANCED, ALL_LEVELS
- Statuses: PLANNED, OPEN_FOR_REGISTRATION, REGISTRATION_CLOSED, ONGOING, COMPLETED, CANCELLED
- Tracks objectives, topics, materials
- Certificate issuance upon completion

**Table: TrainingParticipant**
- Training enrollment and tracking
- Statuses: REGISTERED, CONFIRMED, ATTENDED, COMPLETED, DROPPED, NO_SHOW
- Attendance rate tracking
- Pre and post-assessment scores
- Feedback collection
- Certificate issuance tracking

---

## 4. INSTITUTIONAL DEVELOPMENT & ORGANIZATIONAL STRENGTHENING

**Table: Assessment**
- Organizational capacity assessments
- Types: ORGANIZATIONAL_CAPACITY, FINANCIAL_HEALTH, GOVERNANCE, SAFEGUARDING, PROJECT_MANAGEMENT
- Scoring across multiple areas (0-100):
  - Governance score
  - Financial score
  - Programmatic score
  - HR score
  - Monitoring score
  - Overall score
- Identifies strengths, weaknesses, recommendations
- Links to improvement plans

**Table: ImprovementPlan**
- Action plans based on assessments
- Goals and milestones
- Start, target, and actual completion dates
- Statuses: IN_PROGRESS, COMPLETED, DELAYED, ABANDONED

**Table: Milestone**
- Trackable goals within improvement plans
- Statuses: PENDING, IN_PROGRESS, COMPLETED, OVERDUE
- Evidence upload support
- Target and completion date tracking

**Table: Certificate**
- Certificates and badges for members
- Types: TRAINING_COMPLETION, ACHIEVEMENT_BADGE, ACCREDITATION, MEMBERSHIP
- Verification codes
- Expiry date tracking
- Links to training or achievement

---

## 5. RESOURCE MOBILIZATION & FUNDING SUPPORT

**Table: FundingOpportunity**
- Grant and funding opportunities database
- Funder types: BILATERAL, MULTILATERAL, FOUNDATION, CORPORATE, INDIVIDUAL, GOVERNMENT, UN_AGENCY
- Funding types: GRANT, CONTRACT, COOPERATIVE_AGREEMENT, PRIZE, LOAN, EQUITY
- Statuses: UPCOMING, OPEN, CLOSED, AWARDED, CANCELLED
- Amount, currency, eligible regions, sectors
- Application deadlines and guidelines

**Table: ProposalSupport**
- INARA's proposal development support tracking
- Support types: CONCEPT_NOTE, FULL_PROPOSAL, BUDGET_DEVELOPMENT, REVIEW_FEEDBACK
- Statuses: PLANNING, DRAFTING, REVIEW, SUBMITTED, AWAITING_RESULTS, COMPLETED
- Outcomes: AWARDED, SHORTLISTED, NOT_SELECTED, WITHDRAWN
- Links opportunities to organizations
- Tracks consultant/advisor assigned
- Records awarded amounts

**Table: FundingReceived**
- Success tracking of funding secured by members
- Records funder, amount, project details
- Tracks INARA's contribution to success
- Duration tracking

**Table: Donor**
- Comprehensive donor database
- Donor types and focus areas
- Geographic focus
- Typical grant sizes
- Contact information
- Annual giving capacity

---

## 6. BENEFITS FOR NETWORK MEMBERS

**Table: MemberBenefit**
- Benefits available to network members
- Categories: DISCOUNT, ACCESS_TO_RESOURCES, PRIORITY_SUPPORT, NETWORKING, VISIBILITY, TRAINING, TOOLS
- Tier-based eligibility (Core, Full, Associate, Observer)
- Value description
- Provider information
- Usage limits per member
- Validity periods

**Table: BenefitRedemption**
- Tracks benefit usage by members
- Links to users and organizations
- Redemption dates and notes

---

## ADDITIONAL CORE FEATURES

### Projects & Resources

**Table: Project**
- Relief and development projects
- Types: EMERGENCY_RESPONSE, DEVELOPMENT, ADVOCACY, CAPACITY_BUILDING, RESEARCH, COORDINATION
- Statuses: PLANNING, ACTIVE, ON_HOLD, COMPLETED, CANCELLED
- Priority: CRITICAL, HIGH, MEDIUM, LOW
- Budget, beneficiaries, timeline
- Sectors, tags, location

**Table: ProjectMember**
- Team assignments
- Member roles within projects

**Table: ProjectUpdate**
- Project status updates
- Images and progress reports

**Table: Resource**
- Shareable resources
- Types: EQUIPMENT, SUPPLIES, MEDICINE, FOOD, SHELTER_MATERIALS, VEHICLES, TECHNOLOGY, EXPERTISE, FUNDING, VOLUNTEERS
- Availability tracking
- Location and condition
- Quantity and units

**Table: ProjectResource**
- Resource allocation to projects

### Events Management

**Table: Event**
- Workshops, conferences, webinars, meetings
- Types: WORKSHOP, CONFERENCE, WEBINAR, TRAINING, COORDINATION_MEETING, NETWORKING_EVENT, SEMINAR, CONSULTATION
- Formats: IN_PERSON, ONLINE, HYBRID
- Registration management
- Agenda, speakers, materials
- Recording URLs

**Table: EventParticipant**
- Event registration and attendance
- Statuses: REGISTERED, CONFIRMED, WAITLISTED, ATTENDED, NO_SHOW, CANCELLED
- Feedback and ratings

### Document Library

**Table: Document**
- Templates, guidelines, best practices, toolkits
- Categories: TEMPLATE, GUIDELINE, BEST_PRACTICE, POLICY, PROCEDURE, TOOLKIT, CASE_STUDY, RESEARCH, REPORT, PRESENTATION
- Types: PDF, WORD, EXCEL, POWERPOINT, VIDEO, AUDIO, IMAGE
- Visibility: PUBLIC, MEMBERS_ONLY, ADMIN_ONLY, RESTRICTED
- Download tracking
- Version control

### Communication & Collaboration

**Table: Forum**
- Discussion forums by category
- Visibility: PUBLIC, MEMBERS, RESTRICTED
- Moderation settings

**Table: ForumPost**
- Forum discussions
- Pinned and locked posts
- Views and likes tracking

**Table: ForumComment**
- Threaded comments on posts
- Reply functionality

**Table: Announcement**
- Network-wide announcements
- Types: GENERAL, URGENT, OPPORTUNITY, EVENT, UPDATE, ALERT
- Priority: LOW, NORMAL, HIGH, URGENT
- Target audience selection
- Pinning and expiry dates

**Table: Message**
- Direct messaging
- Types: DIRECT, BROADCAST, ALERT, SYSTEM
- Thread support
- Attachments

**Table: WorkingGroup**
- Thematic working groups
- Focus areas and objectives
- Leaders and co-leaders
- Private/public settings

**Table: WorkingGroupMember**
- Working group membership
- Member roles

**Table: MailingList**
- Email distribution lists
- Moderation settings
- Subscriber management

### System Tables

**Table: Activity**
- Complete audit trail
- Types: USER_REGISTERED, ORG_CREATED, APPLICATION_SUBMITTED, APPLICATION_APPROVED, SERVICE_PROVIDED, TRAINING_COMPLETED, EVENT_ATTENDED, etc.
- Stores metadata for detailed tracking

**Table: Notification**
- User notifications
- Read/unread status
- Links to relevant content

---

## Key Relationships

```
User → Organization (many-to-one)
User → Region (as coordinator or focal point)
Organization → Application (one-to-one)
Organization → Projects (one-to-many)
Organization → ServiceUtilization (one-to-many)
Organization → Assessment (one-to-many)
Organization → FundingReceived (one-to-many)
User → TrainingParticipant (one-to-many)
User → EventParticipant (one-to-many)
User → Certificate (one-to-many)
FundingOpportunity → ProposalSupport (one-to-many)
Assessment → ImprovementPlan (one-to-one)
ImprovementPlan → Milestone (one-to-many)
Project → ProjectMember (one-to-many)
Project → ProjectResource (one-to-many)
Resource → ProjectResource (one-to-many)
Event → EventParticipant (one-to-many)
Training → TrainingParticipant (one-to-many)
Forum → ForumPost (one-to-many)
ForumPost → ForumComment (one-to-many)
WorkingGroup → WorkingGroupMember (one-to-many)
```

---

## Admin Panel Capabilities

The admin panel provides full CRUD (Create, Read, Update, Delete) operations for:

✅ All tables and entities
✅ Bulk operations
✅ Advanced filtering and search
✅ Export functionality
✅ Approval workflows
✅ Status management
✅ Role-based access control

---

## Summary Statistics

- **40+ Database Tables**
- **100+ Fields per major entity**
- **15+ Enumerations** for data consistency
- **Full audit trail** on all actions
- **Comprehensive relationships** between all entities
- **Multi-level access control**
- **Complete lifecycle management** for all processes

This database structure supports the complete operational needs of INARA Network from member onboarding through capacity building, funding support, and impact tracking.
