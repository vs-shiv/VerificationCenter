import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Check, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demo clients
const demoClients = [
  {
    id: 1,
    name: "NatWest Bank",
    logo: "/NatWestBank.png",
    url: "natwest",
    industry: "Banking & Financial Services",
  },
  {
    id: 2,
    name: "Yum! Brands",
    logo: "/Yum.png",
    url: "yumbrands",
    industry: "Food & Beverage",
    subOrganizations: [
      {
        id: "kfc",
        name: "KFC",
        logo: "/KFC.png",
      },
      {
        id: "pizzahut",
        name: "Pizza Hut",
        logo: "/PH.png",
      },
      {
        id: "habitburger",
        name: "Habit Burger",
        logo: "/HB.png",
      },
      {
        id: "tacobell",
        name: "Taco Bell",
        logo: "/TB.png",
      },
    ],
  },
];

// Base departments data
const baseDepartmentsData = {
  "Human Resources": [
    {
      id: 1,
      name: "Resume Screening AI Agent",
      description:
        "Evaluates job applications using advanced natural language processing to match candidate qualifications with job requirements.",
      metrics: {
        cost: { score: 92, status: "verified" },
        carbon: { score: 88, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
      agentId: "HR-AI-Agent-0001",
      versionNumber: "1.2.3",
      lastUpdated: "2025-01-15",
      certificationLevel: "Level-2",
      complianceStatus: "compliant",
    },
    {
      id: 2,
      name: "Employee Sentiment Analysis AI Agent",
      description:
        "Analyzes employee feedback and engagement data to identify workplace satisfaction trends and improvement areas.",
      metrics: {
        cost: { score: 78, status: "in-review" },
        carbon: { score: 82, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
      agentId: "HR-AI-Agent-0002",
      versionNumber: "1.2.3",
      lastUpdated: "2025-01-15",
      certificationLevel: "Level-1",
      complianceStatus: "compliant",
    },
  ],
  "Customer Service": [
    {
      id: 3,
      name: "Chatbot Assistant AI Agent",
      description:
        "Provides 24/7 automated customer support handling common inquiries and service requests.",
      metrics: {
        cost: { score: 88, status: "verified" },
        carbon: { score: 85, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
      agentId: "CS-AI-Agent-0003",
      versionNumber: "1.2.3",
      lastUpdated: "2025-01-15",
      certificationLevel: "Level-3",
      complianceStatus: "compliant",
    },
    {
      id: 4,
      name: "Call Center AI Agent",
      description:
        "Assists call center operators with real-time information and customer interaction guidance.",
      metrics: {
        cost: { score: 65, status: "needs-attention" },
        carbon: { score: 70, status: "in-review" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
      agentId: "CS-AI-Agent-0004",
      versionNumber: "1.2.3",
      lastUpdated: "2025-01-15",
      certificationLevel: "Level-4",
      complianceStatus: "compliant",
    },
    {
      id: 5,
      name: "NatWest Traveler Insurance Policy Specialist (TIPS) AI Agent",
      description:
        "Specializes in travel insurance policy management and claims processing with real-time risk assessment.",
      metrics: {
        cost: { score: 94, status: "verified" },
        carbon: { score: 91, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
      agentId: "CS-AI-Agent-0005",
      versionNumber: "1.3.4",
      lastUpdated: "2025-01-20",
      certificationLevel: "Level-1",
      complianceStatus: "compliant",
    },
  ],
  Finance: [
    {
      id: 6,
      name: "Fraud Detection AI Agent",
      description:
        "Monitors transactions in real-time to identify and prevent fraudulent activities using pattern recognition.",
      metrics: {
        cost: { score: 95, status: "verified" },
        carbon: { score: 93, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
      agentId: "FN-AI-Agent-0006",
      versionNumber: "2.2.3",
      lastUpdated: "2025-01-15",
      certificationLevel: "Level-3",
      complianceStatus: "compliant",
    },
    {
      id: 7,
      name: "Risk Assessment AI Agent",
      description:
        "Evaluates financial risks and creditworthiness using multiple data points and market indicators.",
      metrics: {
        cost: { score: 82, status: "in-review" },
        carbon: { score: 84, status: "verified" },
        fairness: { score: 0, status: "pending" },
        bias: { score: 0, status: "pending" },
      },
      agentId: "FN-AI-Agent-0007",
      versionNumber: "2.3.3",
      lastUpdated: "2025-01-16",
      certificationLevel: "Level-1",
      complianceStatus: "compliant",
    },
  ],
};

// Yum! Brands specific departments
const yumBrandsDepartments = {
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

// Merge the base departments with Yum! Brands departments
const departmentsData = {
  ...baseDepartmentsData,
  ...yumBrandsDepartments,
};

type MetricsType = {
  cost: {
    score: number;
    status: string;
  };
  carbon: {
    score: number;
    status: string;
  };
  fairness: { score: number; status: string };
  bias: { score: number; status: string };
};

const VerificationCenterNew = () => {
  const [selectedClient, setSelectedClient] = useState<
    null | (typeof demoClients)[number]
  >(null);
  const [selectedAgent, setSelectedAgent] = useState<
    null | (typeof departmentsData)[keyof typeof departmentsData][number]
  >(null);

  // Status indicator component with metric type
  const StatusIndicator = ({
    metric,
    score,
    status,
  }: {
    metric: string;
    score: number;
    status: string;
  }) => {
    const getStatusInfo = () => {
      switch (status) {
        case "verified":
          return {
            icon: <Check className="text-green-500" />,
            text: "Verified",
            color: "bg-green-100",
          };
        case "in-review":
          return {
            icon: <AlertTriangle className="text-yellow-500" />,
            text: "In Review",
            color: "bg-yellow-100",
          };
        case "needs-attention":
          return {
            icon: <XCircle className="text-red-500" />,
            text: "Needs Attention",
            color: "bg-red-100",
          };
        case "pending":
          return {
            icon: <AlertTriangle className="text-gray-400" />,
            text: "Pending",
            color: "bg-gray-100",
          };
        default:
          return { icon: null, text: "Unknown", color: "bg-gray-100" };
      }
    };

    const statusInfo = getStatusInfo();

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.color}`}
      >
        {statusInfo.icon}
        <span className="text-sm font-medium capitalize">{metric}</span>
        <span className="text-sm font-medium ml-2">({score}%)</span>
      </div>
    );
  };

  // Agent metrics summary component
  const MetricsSummary = ({ metrics }: { metrics: MetricsType }) => (
    <div className="flex flex-wrap gap-2">
      {Object.entries(metrics).map(([metric, { score, status }]) => (
        <StatusIndicator
          key={metric}
          metric={metric}
          score={score}
          status={status}
        />
      ))}
    </div>
  );

  // Client page view
  const ClientPage = ({ client }: { client: (typeof demoClients)[number] }) => {
    // Filter agents based on client
    const getFilteredAgents = (
      agents: (typeof departmentsData)[keyof typeof departmentsData]
    ) => {
      if (client.name !== "NatWest Bank") {
        return agents.filter(
          (agent) =>
            !agent.name.includes("NatWest Traveler Insurance Policy Specialist")
        );
      }
      return agents;
    };

    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={client.logo}
                alt={client.name}
                className="w-32 h-16 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold">{client.name}</h1>
                <p className="text-gray-600">{client.industry}</p>
              </div>
            </div>
            {client.name.toLowerCase().includes("yum") && (
              <Link
                to={"/new/yum-brands-structure"}
                className="border border-dark py-2 px-4 rounded-md text-dark bg-white shadow-sm"
              >
                View Structure
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(departmentsData).map(([department, agents]) => {
              const filteredAgents = getFilteredAgents(agents);
              if (filteredAgents.length === 0) return null;

              return (
                <Card key={department}>
                  <CardHeader>
                    <CardTitle>{department}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredAgents.map((agent) => (
                        <div
                          key={agent.id}
                          className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{agent.name}</h3>
                            <ArrowRight className="text-gray-400 flex-shrink-0 ml-2" />
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {agent.description}
                          </p>
                          <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Agent ID:</span>{" "}
                                {agent.agentId}
                              </div>
                              <div>
                                <span className="font-medium">Version:</span>{" "}
                                {agent.versionNumber}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Last Updated:
                                </span>{" "}
                                {agent.lastUpdated}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Certification:
                                </span>{" "}
                                {agent.certificationLevel}
                              </div>
                              <div>
                                <span className="font-medium">Status:</span>{" "}
                                {agent.complianceStatus}
                              </div>
                            </div>
                            <MetricsSummary metrics={agent.metrics} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Detailed agent view with multiple metrics
  const AgentDetailPage = ({
    agent,
  }: {
    agent: (typeof departmentsData)[keyof typeof departmentsData][number];
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
                        resource utilization, and efficiency metrics in
                        compliance with the FinOps Framework.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Carbon Footprint</h4>
                      <p>
                        Environmental impact assessment conducted according to
                        GSF SCI ISO/IEC 21031:2024 Standard for measuring energy
                        consumption and carbon emissions from model training and
                        inference.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Fairness & Bias</h4>
                      <p className="text-gray-500">
                        Comprehensive evaluation of model fairness and bias
                        metrics pending verification.
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

  // Navigation
  const handleBack = () => {
    if (selectedAgent) {
      setSelectedAgent(null);
    } else if (selectedClient) {
      setSelectedClient(null);
    }
  };

  return (
    <>
      {selectedClient && (
        <div className="bg-white border-b px-6 py-4">
          <div className="container mx-auto">
            <button
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      <section className="container mx-auto py-6">
        {!selectedClient && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">
                Verified Organizations
              </h1>
              <p className="text-gray-600 mb-8">
                Browse through organizations that have undergone AI system
                verification through the Responsible AI Institute's
                comprehensive assessment framework.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demoClients.map((client) => (
                  <Card
                    key={client.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedClient(client)}
                  >
                    <CardContent className="p-6">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-32 object-contain mb-4"
                      />
                      <h2 className="text-xl font-semibold text-center mb-2">
                        {client.name}
                      </h2>
                      <p className="text-gray-500 text-center">
                        {client.industry}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedClient && !selectedAgent && (
          <ClientPage client={selectedClient} />
        )}
        {selectedAgent && <AgentDetailPage agent={selectedAgent} />}
      </section>
    </>
  );
};

export default VerificationCenterNew;
