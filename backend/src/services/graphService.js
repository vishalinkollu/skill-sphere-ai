const { driver } = require("../config/db");

const getGraphData = async () => {
    const session = driver.session();

    try {
        const result = await session.run(`
      MATCH (u:User)-[:CONNECTED_TO]->(f:User)
      RETURN u,f
    `);

        const nodeMap = new Map();
        const edges = [];

        result.records.forEach((record) => {
            const source =
                record.get("u").properties;

            const target =
                record.get("f").properties;

            if (!nodeMap.has(source.id)) {
                nodeMap.set(source.id, {
                    id: source.id,
                    data: {
                        label: source.name,
                    },
                    position: {
                        x:
                            Math.random() * 500,
                        y:
                            Math.random() * 500,
                    },
                });
            }

            if (!nodeMap.has(target.id)) {
                nodeMap.set(target.id, {
                    id: target.id,
                    data: {
                        label: target.name,
                    },
                    position: {
                        x: 0,
                        y: 0,
                    }
                });
            }

            edges.push({
                id: `${source.id}-${target.id}`,
                source: source.id,
                target: target.id,
                animated: true,
            });
        });

        return {
            nodes: [
                ...nodeMap.values(),
            ],
            edges,
        };
    } finally {
        await session.close();
    }
};

module.exports = {
    getGraphData,
};