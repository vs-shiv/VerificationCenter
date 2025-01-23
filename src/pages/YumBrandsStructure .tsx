import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const YumBrandsStructure = () => {
  const [selectedAgent, setSelectedAgent] = useState<DepartmentAgent | null>(
    null
  );

  // Data structure for the brands
  const brands = [
    {
      name: "KFC",
      description: "Sub-organization of Yum! Brands",
      logo: "/KFC.png",
    },
    {
      name: "Pizza Hut",
      description: "Sub-organization of Yum! Brands",
      logo: "/PH.png",
    },
    {
      name: "Habit Burger",
      description: "Sub-organization of Yum! Brands",
      logo: "/HB.png",
    },
    {
      name: "Taco Bell",
      description: "Sub-organization of Yum! Brands",
      logo: "/TB.png",
    },
  ];

  // Data structure for departments and agents matching the verification center
  type DepartmentAgent = {
    id: number;
    name: string;
    description: string;
    metrics: {
      cost: { score: number; status: string };
      carbon: { score: number; status: string };
      fairness: { score: number; status: string };
      bias: { score: number; status: string };
    };
    agentId: string;
    versionNumber: string;
    lastUpdated: string;
    certificationLevel: string;
    complianceStatus: string;
  };

  type Departments = {
    [key: string]: DepartmentAgent[];
  };

  const departments: Departments = {
    "Food Safety": [
      {
        id: 8,
        name: "Quality Control AI Agent",
        description:
          "Monitors food preparation processes and safety standards across all locations.",
        metrics: {
          cost: { score: 95, status: "verified" },
          carbon: { score: 88, status: "verified" },
          fairness: { score: 92, status: "verified" },
          bias: { score: 90, status: "verified" },
        },
        agentId: "FS-AI-Agent-0001",
        versionNumber: "2.0.1",
        lastUpdated: "2025-01-20",
        certificationLevel: "Level-3",
        complianceStatus: "Compliant",
      },
    ],
    "Supply Chain": [
      {
        id: 9,
        name: "Inventory Management AI Agent",
        description:
          "Optimizes inventory levels and predicts supply chain demands across all brands.",
        metrics: {
          cost: { score: 87, status: "verified" },
          carbon: { score: 85, status: "verified" },
          fairness: { score: 88, status: "verified" },
          bias: { score: 86, status: "verified" },
        },
        agentId: "SC-AI-Agent-0001",
        versionNumber: "1.8.5",
        lastUpdated: "2025-01-18",
        certificationLevel: "Level-2",
        complianceStatus: "Compliant",
      },
    ],
    "Customer Experience": [
      {
        id: 10,
        name: "Order Processing AI Agent",
        description:
          "Manages digital ordering systems and customer preferences across all restaurant brands.",
        metrics: {
          cost: { score: 91, status: "verified" },
          carbon: { score: 89, status: "verified" },
          fairness: { score: 90, status: "verified" },
          bias: { score: 92, status: "verified" },
        },
        agentId: "CX-AI-Agent-0001",
        versionNumber: "2.1.0",
        lastUpdated: "2025-01-19",
        certificationLevel: "Level-3",
        complianceStatus: "Compliant",
      },
    ],
  };

  const AgentDetailPage = ({
    agent,
  }: {
    agent: (typeof departments)[keyof typeof departments][number];
  }) => (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{agent.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Agent Information
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Agent ID:</span>{" "}
                          {agent.agentId}
                        </div>
                        <div>
                          <span className="font-medium">Version:</span>{" "}
                          {agent.versionNumber}
                        </div>
                        <div>
                          <span className="font-medium">Last Updated:</span>{" "}
                          {agent.lastUpdated}
                        </div>
                        <div>
                          <span className="font-medium">
                            Certification Level:
                          </span>{" "}
                          {agent.certificationLevel}
                        </div>
                        <div>
                          <span className="font-medium">
                            Compliance Status:
                          </span>{" "}
                          {agent.complianceStatus}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Verification Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(agent.metrics).map(
                    ([metric, { score, status }]) => (
                      <Card key={metric}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2 capitalize">
                            {metric} Score
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  status === "pending"
                                    ? "bg-gray-400"
                                    : "bg-blue-600"
                                }`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            <span>{score}%</span>
                          </div>
                          <span className="text-sm text-gray-500 mt-1 block">
                            Status:{" "}
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Verification Details
                </h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Cost Assessment</h4>
                      <p>
                        The system has been evaluated for operational costs,
                        resource utilization, and efficiency metrics.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Carbon Footprint</h4>
                      <p>
                        Environmental impact assessment conducted according to
                        GSF SCI ISO/IEC 21031:2024 Standard.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Fairness & Bias</h4>
                      <p>
                        Comprehensive evaluation of model fairness and bias
                        metrics has been completed.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {selectedAgent ? (
        <>
          <div className="bg-white border-b px-6 py-4">
            <div className="container mx-auto">
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back
              </button>
            </div>
          </div>
          {selectedAgent && <AgentDetailPage agent={selectedAgent} />}
        </>
      ) : (
        <div className="max-w-4xl mx-auto py-6">
          <h1 className="text-3xl font-bold mb-8">Yum! Brands Structure</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {brands.map((brand) => (
              <Card
                key={brand.name}
                className="shadow-sm p-6 flex gap-6 items-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-16 object-contain"
                />
                <div>
                  <h2 className="text-xl font-bold">{brand.name}</h2>
                  <p className="text-gray-600">{brand.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">Departments & AI Agents</h2>
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(departments).map(([department, agents]) => (
              <Card key={department}>
                <CardHeader>
                  <CardTitle>{department}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {agents.map((agent) => (
                      <li
                        key={agent?.id}
                        className="flex items-center grow cursor-pointer hover:bg-gray-50 p-2 rounded"
                        onClick={() => setSelectedAgent(agent)}
                      >
                        <div className="w-1 h-4 bg-blue-500 mr-3"></div>
                        <span>{agent?.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default YumBrandsStructure;
