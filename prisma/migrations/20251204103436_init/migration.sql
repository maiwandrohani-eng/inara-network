-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'NETWORK_COORDINATOR', 'REGIONAL_COORDINATOR', 'MEMBER', 'VIEWER');

-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('CORE', 'ORGANIZATIONAL', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "MembershipTier" AS ENUM ('CORE', 'FULL', 'ASSOCIATE', 'OBSERVER');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('NGO', 'INGO', 'UN_AGENCY', 'GOVERNMENT', 'FAITH_BASED', 'COMMUNITY', 'PRIVATE_SECTOR', 'ACADEMIC', 'HEALTHCARE_INSTITUTION', 'HUMANITARIAN_AGENCY');

-- CreateEnum
CREATE TYPE "OrganizationSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "OrganizationStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'SUSPENDED', 'INACTIVE', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ADDITIONAL_INFO_REQUIRED', 'APPROVED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "ApplicationStage" AS ENUM ('DOCUMENT_REVIEW', 'ELIGIBILITY_CHECK', 'INTERVIEW', 'FINAL_APPROVAL', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('EMERGENCY_RESPONSE', 'DEVELOPMENT', 'ADVOCACY', 'CAPACITY_BUILDING', 'RESEARCH', 'COORDINATION');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('EQUIPMENT', 'SUPPLIES', 'MEDICINE', 'FOOD', 'SHELTER_MATERIALS', 'VEHICLES', 'TECHNOLOGY', 'EXPERTISE', 'FUNDING', 'VOLUNTEERS');

-- CreateEnum
CREATE TYPE "PartnershipType" AS ENUM ('STRATEGIC', 'OPERATIONAL', 'FUNDING', 'TECHNICAL', 'ADVOCACY');

-- CreateEnum
CREATE TYPE "PartnershipStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('DIRECT', 'BROADCAST', 'ALERT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('USER_REGISTERED', 'USER_LOGIN', 'ORG_CREATED', 'ORG_VERIFIED', 'PROJECT_CREATED', 'PROJECT_UPDATED', 'RESOURCE_ADDED', 'RESOURCE_ALLOCATED', 'PARTNERSHIP_FORMED', 'MESSAGE_SENT', 'APPLICATION_SUBMITTED', 'APPLICATION_APPROVED', 'SERVICE_PROVIDED', 'TRAINING_COMPLETED', 'EVENT_ATTENDED', 'CERTIFICATE_ISSUED');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('TECHNICAL_ASSISTANCE', 'CONSULTING', 'GRANT_MANAGEMENT', 'PROPOSAL_DEVELOPMENT', 'MONITORING_EVALUATION', 'RESOURCE_MOBILIZATION', 'NETWORKING', 'ADVOCACY', 'CAPACITY_BUILDING', 'LEGAL_SUPPORT', 'FINANCIAL_MANAGEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('ONLINE', 'IN_PERSON', 'HYBRID', 'SELF_PACED');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('REQUESTED', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TrainingCategory" AS ENUM ('GOVERNANCE', 'FINANCIAL_MANAGEMENT', 'MONITORING_EVALUATION', 'PROJECT_MANAGEMENT', 'PROPOSAL_WRITING', 'FUNDRAISING', 'LEADERSHIP', 'COMMUNICATION', 'HR_MANAGEMENT', 'SAFEGUARDING', 'ACCOUNTABILITY', 'STRATEGIC_PLANNING', 'OTHER');

-- CreateEnum
CREATE TYPE "TrainingLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS');

-- CreateEnum
CREATE TYPE "TrainingStatus" AS ENUM ('PLANNED', 'OPEN_FOR_REGISTRATION', 'REGISTRATION_CLOSED', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('REGISTERED', 'CONFIRMED', 'ATTENDED', 'COMPLETED', 'DROPPED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('ORGANIZATIONAL_CAPACITY', 'FINANCIAL_HEALTH', 'GOVERNANCE', 'SAFEGUARDING', 'PROJECT_MANAGEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'DELAYED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('TRAINING_COMPLETION', 'ACHIEVEMENT_BADGE', 'ACCREDITATION', 'MEMBERSHIP', 'OTHER');

-- CreateEnum
CREATE TYPE "FunderType" AS ENUM ('BILATERAL', 'MULTILATERAL', 'FOUNDATION', 'CORPORATE', 'INDIVIDUAL', 'GOVERNMENT', 'UN_AGENCY', 'OTHER');

-- CreateEnum
CREATE TYPE "FundingType" AS ENUM ('GRANT', 'CONTRACT', 'COOPERATIVE_AGREEMENT', 'PRIZE', 'LOAN', 'EQUITY', 'OTHER');

-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('UPCOMING', 'OPEN', 'CLOSED', 'AWARDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProposalSupportType" AS ENUM ('CONCEPT_NOTE', 'FULL_PROPOSAL', 'BUDGET_DEVELOPMENT', 'REVIEW_FEEDBACK', 'OTHER');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('PLANNING', 'DRAFTING', 'REVIEW', 'SUBMITTED', 'AWAITING_RESULTS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ProposalOutcome" AS ENUM ('AWARDED', 'SHORTLISTED', 'NOT_SELECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WORKSHOP', 'CONFERENCE', 'WEBINAR', 'TRAINING', 'COORDINATION_MEETING', 'NETWORKING_EVENT', 'SEMINAR', 'CONSULTATION', 'OTHER');

-- CreateEnum
CREATE TYPE "EventFormat" AS ENUM ('IN_PERSON', 'ONLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PLANNED', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'ONGOING', 'COMPLETED', 'CANCELLED', 'POSTPONED');

-- CreateEnum
CREATE TYPE "EventParticipantStatus" AS ENUM ('REGISTERED', 'CONFIRMED', 'WAITLISTED', 'ATTENDED', 'NO_SHOW', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('TEMPLATE', 'GUIDELINE', 'BEST_PRACTICE', 'POLICY', 'PROCEDURE', 'TOOLKIT', 'CASE_STUDY', 'RESEARCH', 'REPORT', 'PRESENTATION', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PDF', 'WORD', 'EXCEL', 'POWERPOINT', 'VIDEO', 'AUDIO', 'IMAGE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentVisibility" AS ENUM ('PUBLIC', 'MEMBERS_ONLY', 'ADMIN_ONLY', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('GENERAL', 'URGENT', 'OPPORTUNITY', 'EVENT', 'UPDATE', 'ALERT');

-- CreateEnum
CREATE TYPE "AnnouncementPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "ForumVisibility" AS ENUM ('PUBLIC', 'MEMBERS', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "MeetingType" AS ENUM ('REGIONAL_COORDINATION', 'NETWORK_WIDE', 'THEMATIC', 'EMERGENCY', 'PLANNING', 'OTHER');

-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED', 'POSTPONED');

-- CreateEnum
CREATE TYPE "BenefitCategory" AS ENUM ('DISCOUNT', 'ACCESS_TO_RESOURCES', 'PRIORITY_SUPPORT', 'NETWORKING', 'VISIBILITY', 'TRAINING', 'TOOLS', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "avatar" TEXT,
    "phone" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "bio" TEXT,
    "expertise" TEXT[],
    "profession" TEXT,
    "memberType" "MemberType" NOT NULL DEFAULT 'ORGANIZATIONAL',
    "membershipTier" "MembershipTier" NOT NULL DEFAULT 'ASSOCIATE',
    "membershipStartDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" "OrganizationType" NOT NULL,
    "size" "OrganizationSize" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "website" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "logo" TEXT,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "foundedYear" INTEGER,
    "registrationNumber" TEXT,
    "taxId" TEXT,
    "legalStatus" TEXT,
    "focusAreas" TEXT[],
    "operatingRegions" TEXT[],
    "languages" TEXT[],
    "staffCount" INTEGER,
    "volunteerCount" INTEGER,
    "annualBudget" DECIMAL(15,2),
    "facebook" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "membershipTier" "MembershipTier" NOT NULL DEFAULT 'ASSOCIATE',
    "membershipStartDate" TIMESTAMP(3),
    "membershipEndDate" TIMESTAMP(3),
    "status" "OrganizationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "stage" "ApplicationStage" NOT NULL DEFAULT 'DOCUMENT_REVIEW',
    "registrationCertificate" TEXT,
    "financialStatements" TEXT,
    "projectList" TEXT,
    "workSamples" TEXT[],
    "policies" TEXT[],
    "otherDocuments" TEXT[],
    "applicationLetter" TEXT,
    "motivationStatement" TEXT,
    "referenceName" TEXT,
    "referenceEmail" TEXT,
    "referencePhone" TEXT,
    "reviewedBy" TEXT,
    "reviewDate" TIMESTAMP(3),
    "reviewNotes" TEXT,
    "approvedBy" TEXT,
    "approvalDate" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "type" "ProjectType" NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "country" TEXT NOT NULL,
    "region" TEXT,
    "city" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "estimatedDuration" TEXT,
    "targetBeneficiaries" INTEGER,
    "currentBeneficiaries" INTEGER,
    "budget" DECIMAL(12,2),
    "fundingReceived" DECIMAL(12,2),
    "sectors" TEXT[],
    "tags" TEXT[],
    "images" TEXT[],
    "documents" TEXT[],
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMember" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectUpdate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER,
    "unit" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "condition" TEXT,
    "expiryDate" TIMESTAMP(3),
    "images" TEXT[],
    "documents" TEXT[],
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectResource" (
    "id" TEXT NOT NULL,
    "quantityUsed" INTEGER,
    "allocatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "ProjectResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partnership" (
    "id" TEXT NOT NULL,
    "type" "PartnershipType" NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "PartnershipStatus" NOT NULL DEFAULT 'ACTIVE',
    "organizationId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partnership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "type" "MessageType" NOT NULL DEFAULT 'DIRECT',
    "senderId" TEXT NOT NULL,
    "recipientEmail" TEXT,
    "threadId" TEXT,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "deliveryMode" "DeliveryMode" NOT NULL,
    "duration" TEXT,
    "prerequisites" TEXT,
    "objectives" TEXT[],
    "materials" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "capacity" INTEGER,
    "cost" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceUtilization" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "organizationId" TEXT,
    "userId" TEXT,
    "status" "ServiceStatus" NOT NULL DEFAULT 'REQUESTED',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "feedback" TEXT,
    "rating" INTEGER,
    "impact" TEXT,
    "notes" TEXT,

    CONSTRAINT "ServiceUtilization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "TrainingCategory" NOT NULL,
    "deliveryMode" "DeliveryMode" NOT NULL,
    "duration" TEXT NOT NULL,
    "level" "TrainingLevel" NOT NULL,
    "language" TEXT[],
    "maxParticipants" INTEGER,
    "objectives" TEXT[],
    "topics" TEXT[],
    "materials" TEXT[],
    "certificate" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "applicationDeadline" TIMESTAMP(3),
    "status" "TrainingStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingParticipant" (
    "id" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ParticipantStatus" NOT NULL DEFAULT 'REGISTERED',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendanceRate" INTEGER,
    "completedAt" TIMESTAMP(3),
    "preAssessmentScore" INTEGER,
    "postAssessmentScore" INTEGER,
    "feedback" TEXT,
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TrainingParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "userId" TEXT,
    "type" "AssessmentType" NOT NULL,
    "assessmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assessor" TEXT,
    "governanceScore" INTEGER,
    "financialScore" INTEGER,
    "programmaticScore" INTEGER,
    "hrScore" INTEGER,
    "monitoringScore" INTEGER,
    "overallScore" INTEGER,
    "strengths" TEXT[],
    "weaknesses" TEXT[],
    "recommendations" TEXT[],
    "reportUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImprovementPlan" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "goals" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "targetEndDate" TIMESTAMP(3) NOT NULL,
    "actualEndDate" TIMESTAMP(3),
    "status" "PlanStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImprovementPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "evidence" TEXT[],

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "CertificateType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3),
    "trainingId" TEXT,
    "achievementType" TEXT,
    "certificateUrl" TEXT,
    "verificationCode" TEXT,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingOpportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "funderName" TEXT NOT NULL,
    "funderType" "FunderType" NOT NULL,
    "funderWebsite" TEXT,
    "contactEmail" TEXT,
    "fundingType" "FundingType" NOT NULL,
    "amount" DECIMAL(15,2),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "amountRange" TEXT,
    "eligibleRegions" TEXT[],
    "eligibleSectors" TEXT[],
    "eligibleOrgTypes" TEXT[],
    "openDate" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "awardDate" TIMESTAMP(3),
    "applicationUrl" TEXT,
    "guidelines" TEXT,
    "requirements" TEXT[],
    "status" "OpportunityStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundingOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalSupport" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "supportType" "ProposalSupportType" NOT NULL,
    "status" "ProposalStatus" NOT NULL DEFAULT 'PLANNING',
    "supportStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supportEndDate" TIMESTAMP(3),
    "consultant" TEXT,
    "submittedDate" TIMESTAMP(3),
    "requestedAmount" DECIMAL(15,2),
    "outcome" "ProposalOutcome",
    "outcomeDate" TIMESTAMP(3),
    "awardedAmount" DECIMAL(15,2),
    "notes" TEXT,

    CONSTRAINT "ProposalSupport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingReceived" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "opportunityId" TEXT,
    "funderName" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "projectTitle" TEXT NOT NULL,
    "projectDuration" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "inaraSupported" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingReceived_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "FunderType" NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "region" TEXT,
    "focusAreas" TEXT[],
    "geographicFocus" TEXT[],
    "typicalGrantSize" TEXT,
    "totalAnnualGiving" DECIMAL(15,2),
    "contactPerson" TEXT,
    "contactEmail" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "format" "EventFormat" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "venue" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "onlineUrl" TEXT,
    "registrationOpen" BOOLEAN NOT NULL DEFAULT true,
    "registrationDeadline" TIMESTAMP(3),
    "maxParticipants" INTEGER,
    "registrationFee" DECIMAL(10,2),
    "agenda" TEXT,
    "speakers" TEXT[],
    "topics" TEXT[],
    "materials" TEXT[],
    "recordingUrl" TEXT,
    "photos" TEXT[],
    "status" "EventStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipant" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "EventParticipantStatus" NOT NULL DEFAULT 'REGISTERED',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "feedback" TEXT,
    "rating" INTEGER,

    CONSTRAINT "EventParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" "DocumentCategory" NOT NULL,
    "type" "DocumentType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "tags" TEXT[],
    "language" TEXT NOT NULL DEFAULT 'en',
    "version" TEXT,
    "visibility" "DocumentVisibility" NOT NULL DEFAULT 'MEMBERS_ONLY',
    "author" TEXT,
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewed" TIMESTAMP(3),
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "AnnouncementType" NOT NULL,
    "priority" "AnnouncementPriority" NOT NULL DEFAULT 'NORMAL',
    "targetAudience" TEXT[],
    "attachments" TEXT[],
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "pinnedUntil" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "visibility" "ForumVisibility" NOT NULL DEFAULT 'MEMBERS',
    "allowPosts" BOOLEAN NOT NULL DEFAULT true,
    "requireModeration" BOOLEAN NOT NULL DEFAULT false,
    "moderators" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "attachments" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "parentId" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "focusArea" TEXT NOT NULL,
    "objectives" TEXT[],
    "leaderId" TEXT NOT NULL,
    "coLeaders" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkingGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingGroupMember" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkingGroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailingList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "moderated" BOOLEAN NOT NULL DEFAULT false,
    "allowExternal" BOOLEAN NOT NULL DEFAULT false,
    "subscribers" TEXT[],
    "moderators" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "countries" TEXT[],
    "continent" TEXT,
    "coordinatorId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoordinationMeeting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "regionId" TEXT,
    "type" "MeetingType" NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "format" "EventFormat" NOT NULL,
    "venue" TEXT,
    "onlineUrl" TEXT,
    "agenda" TEXT,
    "minutes" TEXT,
    "actionItems" TEXT[],
    "participants" TEXT[],
    "documents" TEXT[],
    "recording" TEXT,
    "status" "MeetingStatus" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoordinationMeeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberBenefit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "BenefitCategory" NOT NULL,
    "availableToTiers" "MembershipTier"[],
    "value" TEXT,
    "provider" TEXT,
    "instructions" TEXT,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "limitPerMember" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BenefitRedemption" (
    "id" TEXT NOT NULL,
    "benefitId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "BenefitRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RegionalFocalPoint" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_organizationId_idx" ON "User"("organizationId");

-- CreateIndex
CREATE INDEX "User_memberType_idx" ON "User"("memberType");

-- CreateIndex
CREATE INDEX "User_membershipTier_idx" ON "User"("membershipTier");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_slug_idx" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_country_idx" ON "Organization"("country");

-- CreateIndex
CREATE INDEX "Organization_status_idx" ON "Organization"("status");

-- CreateIndex
CREATE INDEX "Organization_membershipTier_idx" ON "Organization"("membershipTier");

-- CreateIndex
CREATE UNIQUE INDEX "Application_organizationId_key" ON "Application"("organizationId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_stage_idx" ON "Application"("stage");

-- CreateIndex
CREATE INDEX "Application_organizationId_idx" ON "Application"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");

-- CreateIndex
CREATE INDEX "Project_organizationId_idx" ON "Project"("organizationId");

-- CreateIndex
CREATE INDEX "Project_country_idx" ON "Project"("country");

-- CreateIndex
CREATE INDEX "ProjectMember_projectId_idx" ON "ProjectMember"("projectId");

-- CreateIndex
CREATE INDEX "ProjectMember_userId_idx" ON "ProjectMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMember_projectId_userId_key" ON "ProjectMember"("projectId", "userId");

-- CreateIndex
CREATE INDEX "ProjectUpdate_projectId_idx" ON "ProjectUpdate"("projectId");

-- CreateIndex
CREATE INDEX "Resource_type_idx" ON "Resource"("type");

-- CreateIndex
CREATE INDEX "Resource_organizationId_idx" ON "Resource"("organizationId");

-- CreateIndex
CREATE INDEX "Resource_country_idx" ON "Resource"("country");

-- CreateIndex
CREATE INDEX "ProjectResource_projectId_idx" ON "ProjectResource"("projectId");

-- CreateIndex
CREATE INDEX "ProjectResource_resourceId_idx" ON "ProjectResource"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectResource_projectId_resourceId_key" ON "ProjectResource"("projectId", "resourceId");

-- CreateIndex
CREATE INDEX "Partnership_organizationId_idx" ON "Partnership"("organizationId");

-- CreateIndex
CREATE INDEX "Partnership_partnerId_idx" ON "Partnership"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Partnership_organizationId_partnerId_key" ON "Partnership"("organizationId", "partnerId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_recipientEmail_idx" ON "Message"("recipientEmail");

-- CreateIndex
CREATE INDEX "Message_threadId_idx" ON "Message"("threadId");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");

-- CreateIndex
CREATE INDEX "Activity_type_idx" ON "Activity"("type");

-- CreateIndex
CREATE INDEX "Activity_createdAt_idx" ON "Activity"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_read_idx" ON "Notification"("read");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_category_idx" ON "Service"("category");

-- CreateIndex
CREATE INDEX "Service_active_idx" ON "Service"("active");

-- CreateIndex
CREATE INDEX "ServiceUtilization_serviceId_idx" ON "ServiceUtilization"("serviceId");

-- CreateIndex
CREATE INDEX "ServiceUtilization_organizationId_idx" ON "ServiceUtilization"("organizationId");

-- CreateIndex
CREATE INDEX "ServiceUtilization_userId_idx" ON "ServiceUtilization"("userId");

-- CreateIndex
CREATE INDEX "ServiceUtilization_status_idx" ON "ServiceUtilization"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Training_slug_key" ON "Training"("slug");

-- CreateIndex
CREATE INDEX "Training_category_idx" ON "Training"("category");

-- CreateIndex
CREATE INDEX "Training_status_idx" ON "Training"("status");

-- CreateIndex
CREATE INDEX "TrainingParticipant_trainingId_idx" ON "TrainingParticipant"("trainingId");

-- CreateIndex
CREATE INDEX "TrainingParticipant_userId_idx" ON "TrainingParticipant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingParticipant_trainingId_userId_key" ON "TrainingParticipant"("trainingId", "userId");

-- CreateIndex
CREATE INDEX "Assessment_organizationId_idx" ON "Assessment"("organizationId");

-- CreateIndex
CREATE INDEX "Assessment_userId_idx" ON "Assessment"("userId");

-- CreateIndex
CREATE INDEX "Assessment_type_idx" ON "Assessment"("type");

-- CreateIndex
CREATE UNIQUE INDEX "ImprovementPlan_assessmentId_key" ON "ImprovementPlan"("assessmentId");

-- CreateIndex
CREATE INDEX "ImprovementPlan_status_idx" ON "ImprovementPlan"("status");

-- CreateIndex
CREATE INDEX "Milestone_planId_idx" ON "Milestone"("planId");

-- CreateIndex
CREATE INDEX "Milestone_status_idx" ON "Milestone"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_verificationCode_key" ON "Certificate"("verificationCode");

-- CreateIndex
CREATE INDEX "Certificate_userId_idx" ON "Certificate"("userId");

-- CreateIndex
CREATE INDEX "Certificate_type_idx" ON "Certificate"("type");

-- CreateIndex
CREATE UNIQUE INDEX "FundingOpportunity_slug_key" ON "FundingOpportunity"("slug");

-- CreateIndex
CREATE INDEX "FundingOpportunity_status_idx" ON "FundingOpportunity"("status");

-- CreateIndex
CREATE INDEX "FundingOpportunity_deadline_idx" ON "FundingOpportunity"("deadline");

-- CreateIndex
CREATE INDEX "FundingOpportunity_funderType_idx" ON "FundingOpportunity"("funderType");

-- CreateIndex
CREATE INDEX "ProposalSupport_opportunityId_idx" ON "ProposalSupport"("opportunityId");

-- CreateIndex
CREATE INDEX "ProposalSupport_organizationId_idx" ON "ProposalSupport"("organizationId");

-- CreateIndex
CREATE INDEX "ProposalSupport_status_idx" ON "ProposalSupport"("status");

-- CreateIndex
CREATE INDEX "FundingReceived_organizationId_idx" ON "FundingReceived"("organizationId");

-- CreateIndex
CREATE INDEX "FundingReceived_opportunityId_idx" ON "FundingReceived"("opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_slug_key" ON "Donor"("slug");

-- CreateIndex
CREATE INDEX "Donor_type_idx" ON "Donor"("type");

-- CreateIndex
CREATE INDEX "Donor_active_idx" ON "Donor"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE INDEX "Event_status_idx" ON "Event"("status");

-- CreateIndex
CREATE INDEX "Event_startDate_idx" ON "Event"("startDate");

-- CreateIndex
CREATE INDEX "EventParticipant_eventId_idx" ON "EventParticipant"("eventId");

-- CreateIndex
CREATE INDEX "EventParticipant_userId_idx" ON "EventParticipant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EventParticipant_eventId_userId_key" ON "EventParticipant"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_slug_key" ON "Document"("slug");

-- CreateIndex
CREATE INDEX "Document_category_idx" ON "Document"("category");

-- CreateIndex
CREATE INDEX "Document_type_idx" ON "Document"("type");

-- CreateIndex
CREATE INDEX "Document_visibility_idx" ON "Document"("visibility");

-- CreateIndex
CREATE INDEX "Announcement_type_idx" ON "Announcement"("type");

-- CreateIndex
CREATE INDEX "Announcement_priority_idx" ON "Announcement"("priority");

-- CreateIndex
CREATE INDEX "Announcement_published_idx" ON "Announcement"("published");

-- CreateIndex
CREATE UNIQUE INDEX "Forum_slug_key" ON "Forum"("slug");

-- CreateIndex
CREATE INDEX "Forum_slug_idx" ON "Forum"("slug");

-- CreateIndex
CREATE INDEX "Forum_visibility_idx" ON "Forum"("visibility");

-- CreateIndex
CREATE INDEX "ForumPost_forumId_idx" ON "ForumPost"("forumId");

-- CreateIndex
CREATE INDEX "ForumPost_authorId_idx" ON "ForumPost"("authorId");

-- CreateIndex
CREATE INDEX "ForumComment_postId_idx" ON "ForumComment"("postId");

-- CreateIndex
CREATE INDEX "ForumComment_authorId_idx" ON "ForumComment"("authorId");

-- CreateIndex
CREATE INDEX "ForumComment_parentId_idx" ON "ForumComment"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingGroup_slug_key" ON "WorkingGroup"("slug");

-- CreateIndex
CREATE INDEX "WorkingGroup_slug_idx" ON "WorkingGroup"("slug");

-- CreateIndex
CREATE INDEX "WorkingGroup_active_idx" ON "WorkingGroup"("active");

-- CreateIndex
CREATE INDEX "WorkingGroupMember_groupId_idx" ON "WorkingGroupMember"("groupId");

-- CreateIndex
CREATE INDEX "WorkingGroupMember_userId_idx" ON "WorkingGroupMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingGroupMember_groupId_userId_key" ON "WorkingGroupMember"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "MailingList_slug_key" ON "MailingList"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MailingList_email_key" ON "MailingList"("email");

-- CreateIndex
CREATE INDEX "MailingList_slug_idx" ON "MailingList"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "Region"("slug");

-- CreateIndex
CREATE INDEX "Region_slug_idx" ON "Region"("slug");

-- CreateIndex
CREATE INDEX "CoordinationMeeting_regionId_idx" ON "CoordinationMeeting"("regionId");

-- CreateIndex
CREATE INDEX "CoordinationMeeting_scheduledDate_idx" ON "CoordinationMeeting"("scheduledDate");

-- CreateIndex
CREATE UNIQUE INDEX "MemberBenefit_slug_key" ON "MemberBenefit"("slug");

-- CreateIndex
CREATE INDEX "MemberBenefit_category_idx" ON "MemberBenefit"("category");

-- CreateIndex
CREATE INDEX "MemberBenefit_active_idx" ON "MemberBenefit"("active");

-- CreateIndex
CREATE INDEX "BenefitRedemption_benefitId_idx" ON "BenefitRedemption"("benefitId");

-- CreateIndex
CREATE INDEX "BenefitRedemption_userId_idx" ON "BenefitRedemption"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_RegionalFocalPoint_AB_unique" ON "_RegionalFocalPoint"("A", "B");

-- CreateIndex
CREATE INDEX "_RegionalFocalPoint_B_index" ON "_RegionalFocalPoint"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUpdate" ADD CONSTRAINT "ProjectUpdate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectResource" ADD CONSTRAINT "ProjectResource_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectResource" ADD CONSTRAINT "ProjectResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceUtilization" ADD CONSTRAINT "ServiceUtilization_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceUtilization" ADD CONSTRAINT "ServiceUtilization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceUtilization" ADD CONSTRAINT "ServiceUtilization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingParticipant" ADD CONSTRAINT "TrainingParticipant_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingParticipant" ADD CONSTRAINT "TrainingParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImprovementPlan" ADD CONSTRAINT "ImprovementPlan_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ImprovementPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalSupport" ADD CONSTRAINT "ProposalSupport_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "FundingOpportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalSupport" ADD CONSTRAINT "ProposalSupport_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingReceived" ADD CONSTRAINT "FundingReceived_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingReceived" ADD CONSTRAINT "FundingReceived_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "FundingOpportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ForumPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ForumComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingGroupMember" ADD CONSTRAINT "WorkingGroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "WorkingGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingGroupMember" ADD CONSTRAINT "WorkingGroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinationMeeting" ADD CONSTRAINT "CoordinationMeeting_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BenefitRedemption" ADD CONSTRAINT "BenefitRedemption_benefitId_fkey" FOREIGN KEY ("benefitId") REFERENCES "MemberBenefit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegionalFocalPoint" ADD CONSTRAINT "_RegionalFocalPoint_A_fkey" FOREIGN KEY ("A") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegionalFocalPoint" ADD CONSTRAINT "_RegionalFocalPoint_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
