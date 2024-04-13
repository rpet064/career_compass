-- CreateTable
CREATE TABLE "jobapplications" (
    "jobapplicationsid" SERIAL NOT NULL,
    "userid" INTEGER,
    "resumeid" INTEGER,
    "joburl" VARCHAR(2048),
    "progress" VARCHAR(50),
    "sentiment" INTEGER,
    "notes" TEXT,
    "whencreated" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "whendeleted" TIMESTAMP(6),

    CONSTRAINT "jobapplications_pkey" PRIMARY KEY ("jobapplicationsid")
);

-- CreateTable
CREATE TABLE "resume" (
    "resumeid" SERIAL NOT NULL,
    "resumename" VARCHAR(255) NOT NULL,
    "resumedescription" TEXT,
    "resumeurl" VARCHAR(2048),
    "whencreated" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "whendeleted" TIMESTAMP(6),

    CONSTRAINT "resume_pkey" PRIMARY KEY ("resumeid")
);

-- CreateTable
CREATE TABLE "roles" (
    "roleid" SERIAL NOT NULL,
    "rolename" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roleid")
);

-- CreateTable
CREATE TABLE "sessiontokens" (
    "tokenid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "whencreated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whenexpired" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "sessiontokens_pkey" PRIMARY KEY ("tokenid")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "roleid" INTEGER NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "password" VARCHAR(25) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "title" VARCHAR(25),
    "firstname" VARCHAR(50),
    "lastname" VARCHAR(50),
    "whendeleted" TIMESTAMPTZ(6),
    "whencreated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- AddForeignKey
ALTER TABLE "jobapplications" ADD CONSTRAINT "jobapplications_resumeid_fkey" FOREIGN KEY ("resumeid") REFERENCES "resume"("resumeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jobapplications" ADD CONSTRAINT "jobapplications_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessiontokens" ADD CONSTRAINT "sessiontokens_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "roles"("roleid") ON DELETE NO ACTION ON UPDATE NO ACTION;
