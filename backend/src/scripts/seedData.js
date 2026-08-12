require("dotenv").config();

const { driver } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const users = [
  "Vishal",
  "Sai",
  "John",
  "Emma",
  "David",
  "Sophia",
  "Michael",
  "Olivia",
  "Daniel",
  "James",
];

const skills = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "TypeScript",
  "Docker",
  "AWS",
  "GraphQL",
  "Python",
];

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
];

const seedDatabase = async () => {
  const session = driver.session();

  try {
    console.log("Clearing old graph...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    // ==========================
    // CREATE SKILLS
    // ==========================

    const skillIds = {};

    for (const skill of skills) {
      const id = uuidv4();

      skillIds[skill] = id;

      await session.run(
        `
        CREATE (:Skill {
          id:$id,
          name:$name
        })
      `,
        {
          id,
          name: skill,
        }
      );
    }

    console.log("Skills created");

    // ==========================
    // CREATE COMPANIES
    // ==========================

    const companyIds = {};

    for (const company of companies) {
      const id = uuidv4();

      companyIds[company] = id;

      await session.run(
        `
        CREATE (:Company {
          id:$id,
          name:$name,
          industry:"Technology"
        })
      `,
        {
          id,
          name: company,
        }
      );
    }

    console.log("Companies created");

    // ==========================
    // CREATE USERS
    // ==========================

    const userIds = {};

    for (const user of users) {
      const id = uuidv4();

      userIds[user] = id;

      await session.run(
        `
        CREATE (:User {
          id:$id,
          name:$name,
          email:$email,
          location:"Hyderabad",
          experience:$experience
        })
      `,
        {
          id,
          name: user,
          email: `${user.toLowerCase()}@gmail.com`,
          experience:
            Math.floor(Math.random() * 8) + 1,
        }
      );
    }

    console.log("Users created");

    // ==========================
    // USER -> SKILLS
    // ==========================

    const skillList = Object.values(skillIds);

    for (const userId of Object.values(userIds)) {
      const randomSkills = [...skillList]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      for (const skillId of randomSkills) {
        await session.run(
          `
          MATCH (u:User {id:$userId})
          MATCH (s:Skill {id:$skillId})

          CREATE (u)-[:HAS_SKILL]->(s)
        `,
          {
            userId,
            skillId,
          }
        );
      }
    }

    console.log("User skills connected");

    // ==========================
    // USER -> COMPANY
    // ==========================

    const companyList =
      Object.values(companyIds);

    for (const userId of Object.values(userIds)) {
      const companyId =
        companyList[
          Math.floor(
            Math.random() *
              companyList.length
          )
        ];

      await session.run(
        `
        MATCH (u:User {id:$userId})
        MATCH (c:Company {id:$companyId})

        CREATE (u)-[:WORKED_AT]->(c)
      `,
        {
          userId,
          companyId,
        }
      );
    }

    console.log("Users linked to companies");

    // ==========================
    // USER CONNECTIONS
    // ==========================

    const connections = [
      ["Vishal", "Sai"],
      ["Vishal", "John"],

      ["Sai", "Emma"],
      ["Sai", "David"],

      ["John", "Sophia"],
      ["John", "Michael"],

      ["Emma", "Olivia"],

      ["David", "Daniel"],

      ["Sophia", "James"],

      ["Michael", "Olivia"],
      ["Daniel", "James"],
    ];

    for (const [from, to] of connections) {
      await session.run(
        `
        MATCH (u1:User {id:$user1})
        MATCH (u2:User {id:$user2})

        CREATE (u1)-[:CONNECTED_TO]->(u2)
      `,
        {
          user1: userIds[from],
          user2: userIds[to],
        }
      );
    }

    console.log(
      "User connections created"
    );

    // ==========================
    // COMPANY -> SKILLS
    // ==========================

    for (const companyId of companyList) {
      const requiredSkills = [
        "React",
        "Node.js",
        "AWS",
      ];

      for (const skillName of requiredSkills) {
        await session.run(
          `
          MATCH (c:Company {id:$companyId})
          MATCH (s:Skill {name:$skillName})

          CREATE (c)-[:LOOKING_FOR]->(s)
        `,
          {
            companyId,
            skillName,
          }
        );
      }
    }

    console.log(
      "Company skill requirements created"
    );

    // ==========================
    // SKILL RELATIONSHIPS
    // ==========================

    const skillRelations = [
      ["React", "JavaScript"],
      ["React", "TypeScript"],
      ["Node.js", "Express"],
      ["Node.js", "Docker"],
      ["MongoDB", "AWS"],
      ["GraphQL", "TypeScript"],
      ["Python", "AWS"],
      ["Docker", "AWS"],
    ];

    for (const [from, to] of skillRelations) {
      await session.run(
        `
        MATCH (s1:Skill {name:$from})
        MATCH (s2:Skill {name:$to})

        CREATE (s1)-[:RELATED_TO]->(s2)
      `,
        {
          from,
          to,
        }
      );
    }

    console.log(
      "Skill relationships created"
    );

    console.log(
      "Graph seeded successfully!"
    );
  } catch (error) {
    console.error(
      "Seed Error:",
      error
    );
  } finally {
    await session.close();
    await driver.close();
  }
};

seedDatabase();