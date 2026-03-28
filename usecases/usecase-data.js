window.USECASE_DATA = {
  "ha-webapp": {
    title: "High Availability Enterprise",
    summary: "Construct a resilient, production-ready stack utilizing global edge caching, distributed DNS, and multi-node redundancy across multiple network zones.",
    slots: [
      { id: "dns", label: "Global Traffic Resolver", hint: "Resolution service", x: 18, y: 12, expected: "route53" },
      { id: "cdn", label: "Regional Distribution Node", hint: "Edge distribution", x: 36, y: 12, expected: "cloudfront" },
      { id: "igw", label: "Network Ingress Bridge", hint: "Entrance gateway", x: 55, y: 30, expected: "igw" },
      { id: "alb", label: "Application Request Router", hint: "Site load balancer", x: 41, y: 45, expected: "alb" },
      { id: "app1", label: "Virtual Compute Instance", hint: "Worker node A", x: 30, y: 72, expected: "ec2" },
      { id: "app2", label: "Virtual Compute Instance", hint: "Worker node B", x: 48, y: 72, expected: "ec2" },
      { id: "db", label: "Relational Data Cluster", hint: "HA data tier", x: 72, y: 72, expected: "rds" },
      { id: "s3", label: "Scalable Object Repository", hint: "Asset backplane", x: 88, y: 12, expected: "s3" }
    ],
    zones: [
      { label: "Edge Infrastructure", x: 7, y: 4, w: 88, h: 18, cls: "zone-edge" },
      { label: "Regional Network (VPC)", x: 12, y: 24, w: 80, h: 70, cls: "zone-vpc" },
      { label: "Ingress Layer", x: 16, y: 36, w: 72, h: 18, cls: "zone-public" },
      { label: "Compute Plane", x: 16, y: 57, w: 44, h: 32, cls: "zone-private" },
      { label: "Redundant Data Tier", x: 62, y: 57, w: 26, h: 32, cls: "zone-data" }
    ],
    links: [
      ["dns", "cdn", "Traffic"],
      ["cdn", "igw", "Origin Fetch"],
      ["igw", "alb", "Ingress"],
      ["alb", "app1", "Forward"],
      ["alb", "app2", "Forward"],
      ["app1", "db", "Commit"],
      ["app2", "db", "Commit"],
      ["app1", "s3", "Storage"]
    ]
  },
  "nat-egress": {
    title: "Secure Private Egress",
    summary: "Enable private workloads to fetch external updates without allowing inbound public probing. Master the routing logic for an outbound-only gateway.",
    slots: [
      { id: "igw", label: "Network Ingress Bridge", hint: "Internet bridge", x: 28, y: 12, expected: "igw" },
      { id: "alb", label: "Application Request Router", hint: "Public entry", x: 42, y: 40, expected: "alb" },
      { id: "nat", label: "Secure Address Translator", hint: "Outbound translation", x: 68, y: 40, expected: "nat" },
      { id: "route", label: "Traffic Path Definition", hint: "Routing logic", x: 84, y: 40, expected: "route" },
      { id: "app", label: "Virtual Compute Instance", hint: "Private worker", x: 36, y: 75, expected: "ec2" },
      { id: "db", label: "Relational Data Cluster", hint: "Private store", x: 70, y: 75, expected: "rds" }
    ],
    zones: [
      { label: "Public Realm", x: 7, y: 4, w: 88, h: 16, cls: "zone-edge" },
      { label: "Network Enclosure", x: 12, y: 22, w: 82, h: 72, cls: "zone-vpc" },
      { label: "Public Routing Tier", x: 16, y: 34, w: 74, h: 18, cls: "zone-public" },
      { label: "Private Workload Tier", x: 16, y: 60, w: 74, h: 28, cls: "zone-private" }
    ],
    links: [["igw", "alb", "Inbound"], ["app", "nat", "Patch Request"], ["nat", "igw", "Exit Flow"], ["app", "db", "Storage"]]
  },
  "edge-api-static": {
    title: "Hybrid Edge Orchestration",
    summary: "Orchestrate a complex multi-origin strategy. Configure your edge to intelligently route requests between static assets and dynamic processing services.",
    slots: [
      { id: "dns", label: "Global Traffic Resolver", hint: "Primary router", x: 15, y: 12, expected: "route53" },
      { id: "cdn", label: "Regional Distribution Node", hint: "Path distribution", x: 34, y: 12, expected: "cloudfront" },
      { id: "api", label: "API Frontier Interface", hint: "Managed entry", x: 50, y: 12, expected: "api" },
      { id: "s3", label: "Scalable Object Repository", hint: "Static backplane", x: 74, y: 12, expected: "s3" },
      { id: "igw", label: "Network Ingress Bridge", hint: "Internal bridge", x: 62, y: 34, expected: "igw" },
      { id: "alb", label: "Application Request Router", hint: "VPC balancer", x: 48, y: 48, expected: "alb" },
      { id: "app", label: "Virtual Compute Instance", hint: "Compute worker", x: 48, y: 74, expected: "ec2" }
    ],
    zones: [
      { label: "Orchestration Frontier", x: 5, y: 4, w: 90, h: 22, cls: "zone-edge" },
      { label: "Core Network (VPC)", x: 12, y: 28, w: 78, h: 66, cls: "zone-vpc" },
      { label: "Entry Subnet", x: 16, y: 42, w: 70, h: 18, cls: "zone-public" },
      { label: "Logic Subnet", x: 24, y: 64, w: 52, h: 24, cls: "zone-private" }
    ],
    links: [["dns", "cdn", "Orchestration"], ["cdn", "api", "Dynamic Path"], ["cdn", "s3", "Static Path"], ["api", "igw", "Proxy In"], ["igw", "alb", "VPC Ingress"], ["alb", "app", "Invocation"]]
  },
  "private-rds": {
    title: "Tier-Isolating DB Access",
    summary: "Architect a multi-tier boundary ensuring the database layer is entirely isolated from public ingress, reachable only by specific processing nodes.",
    slots: [
      { id: "igw", label: "Network Ingress Bridge", hint: "Edge connection", x: 30, y: 20, expected: "igw" },
      { id: "alb", label: "Public Entry Router", hint: "Load distribution", x: 44, y: 40, expected: "alb" },
      { id: "app", label: "Processing Tier Node", hint: "Business logic", x: 36, y: 70, expected: "ec2" },
      { id: "db", label: "Isolated Data Node", hint: "Private persistence", x: 70, y: 70, expected: "rds" }
    ],
    zones: [
      { label: "Network Partition Boundary", x: 12, y: 14, w: 78, h: 80, cls: "zone-vpc" },
      { label: "Public Entryway", x: 16, y: 32, w: 70, h: 18, cls: "zone-public" },
      { label: "Private Logic Tier", x: 16, y: 58, w: 36, h: 30, cls: "zone-private" },
      { label: "Shielded Data Tier", x: 56, y: 58, w: 30, h: 30, cls: "zone-data" }
    ],
    links: [["igw", "alb", "Ingress"], ["alb", "app", "Proxy"], ["app", "db", "Private SQL"]]
  },
  "cdn-s3-static": {
    title: "Global Static Delivery",
    summary: "Orchestrate high-speed content delivery for a static web presence. Ensure the storage origin is correctly linked to the edge distribution network.",
    slots: [
      { id: "dns", label: "Global Traffic Router", hint: "Resolution service", x: 20, y: 18, expected: "route53" },
      { id: "cdn", label: "Edge Distribution Node", hint: "Regional caching node", x: 45, y: 18, expected: "cloudfront" },
      { id: "s3", label: "Scalable Object Store", hint: "Static asset origin", x: 75, y: 18, expected: "s3" }
    ],
    zones: [{ label: "Edge + Storage Origin", x: 10, y: 8, w: 80, h: 50, cls: "zone-edge" }],
    links: [["dns", "cdn", "Traffic"], ["cdn", "s3", "Origin Fetch"]]
  },
  "api-to-ec2": {
    title: "Serverless API Frontend",
    summary: "Decouple your frontend entry from the backend compute by using a managed interface to proxy requests into a load-balanced internal tier.",
    slots: [
      { id: "api", label: "API Frontier Interface", hint: "Managed entry point", x: 28, y: 18, expected: "api" },
      { id: "igw", label: "Network Ingress Bridge", hint: "VPC edge", x: 48, y: 32, expected: "igw" },
      { id: "alb", label: "Application Request Router", hint: "Traffic manager", x: 48, y: 50, expected: "alb" },
      { id: "app", label: "Virtual Compute Instance", hint: "Private processing", x: 48, y: 75, expected: "ec2" }
    ],
    zones: [
      { label: "Serverless Tier", x: 10, y: 8, w: 80, h: 16, cls: "zone-edge" },
      { label: "VPC Container", x: 12, y: 26, w: 78, h: 68, cls: "zone-vpc" },
      { label: "Ingress Shield", x: 20, y: 40, w: 58, h: 18, cls: "zone-public" },
      { label: "Private Backplane", x: 20, y: 64, w: 58, h: 24, cls: "zone-private" }
    ],
    links: [["api", "igw", "HTTPS Proxy"], ["igw", "alb", "Route"], ["alb", "app", "Invocation"]]
  },
  "ec2-to-rds": {
    title: "Two-Tier Production Hub",
    summary: "Connect a scalable compute node to a managed relational database within a protected network partition. Ensure the data tier is correctly linked for application queries.",
    slots: [
      { id: "alb", label: "External Load Router", hint: "Public ingress entry", x: 36, y: 35, expected: "alb" },
      { id: "app", label: "Standard Compute Unit", hint: "Application logic", x: 36, y: 68, expected: "ec2" },
      { id: "db", label: "Relational Data Cluster", hint: "Managed data store", x: 72, y: 68, expected: "rds" }
    ],
    zones: [
      { label: "Internal Network Partition", x: 12, y: 20, w: 78, h: 70, cls: "zone-vpc" },
      { label: "Public Ingress Zone", x: 18, y: 30, w: 66, h: 18, cls: "zone-public" },
      { label: "Secure Application Tier", x: 18, y: 56, w: 66, h: 28, cls: "zone-private" }
    ],
    links: [["alb", "app", "Probing"], ["app", "db", "Query"]]
  },
  "s3-log-pipeline": {
    title: "Secure Log Collection",
    summary: "Implement a robust telemetry flow where distributed compute nodes ingest logs directly into a secure, durable object store. Master the logic of outbound data archival.",
    slots: [
      { id: "alb", label: "Traffic Balancer", hint: "User entry point", x: 34, y: 30, expected: "alb" },
      { id: "app", label: "Telemetry Producer", hint: "Compute instance", x: 34, y: 65, expected: "ec2" },
      { id: "s3", label: "Durable Log Archive", hint: "Object repository", x: 74, y: 65, expected: "s3" }
    ],
    zones: [
      { label: "Network Partition", x: 12, y: 22, w: 78, h: 68, cls: "zone-vpc" },
      { label: "Application Subnet", x: 18, y: 44, w: 32, h: 36, cls: "zone-private" },
      { label: "Centralized Storage", x: 58, y: 44, w: 26, h: 36, cls: "zone-data" }
    ],
    links: [["alb", "app", "Requests"], ["app", "s3", "Archive Write"]]
  },

  "networking-1": {
    title: "Public Internet Access",
    summary: "A startup needs to expose a basic web server to the internet. Route traffic from a Public Subnet through an Internet Gateway.",
    slots: [
      { id: "igw", label: "Internet Gateway", hint: "VPC ingress", x: 50, y: 15, expected: "igw" },
      { id: "rtb", label: "Route Table", hint: "Public Route", x: 50, y: 40, expected: "route" },
      { id: "ec2", label: "EC2 App", hint: "Web Server", x: 50, y: 70, expected: "ec2" }
    ],
    zones: [
      { label: "VPC", x: 10, y: 5, w: 80, h: 85, cls: "zone-vpc" },
      { label: "Public Subnet", x: 20, y: 30, w: 60, h: 55, cls: "zone-public" }
    ],
    links: [
      ["igw", "rtb", "0.0.0.0/0"],
      ["rtb", "ec2", "Local Route"]
    ]
  },
  "networking-2": {
    title: "Private Egress via NAT",
    summary: "Your database tier needs to securely download patches. Route outbound traffic through a NAT Gateway.",
    slots: [
      { id: "igw", label: "Internet Gateway", hint: "VPC edge", x: 50, y: 12, expected: "igw" },
      { id: "nat", label: "NAT Gateway", hint: "Outbound Proxy", x: 50, y: 38, expected: "nat" },
      { id: "rtb", label: "Route Table", hint: "Private Route", x: 50, y: 62, expected: "route" },
      { id: "rds", label: "Database", hint: "Private instance", x: 50, y: 85, expected: "rds" }
    ],
    zones: [
      { label: "VPC", x: 5, y: 4, w: 90, h: 92, cls: "zone-vpc" },
      { label: "Public Subnet", x: 10, y: 25, w: 80, h: 25, cls: "zone-public" },
      { label: "Private Subnet", x: 10, y: 55, w: 80, h: 40, cls: "zone-private" }
    ],
    links: [
      ["rds", "rtb", "Outbound"],
      ["rtb", "nat", "0.0.0.0/0"],
      ["nat", "igw", "Egress"]
    ]
  },
  "networking-3": {
    title: "Inter-Team VPC Peering",
    summary: "The Data team needs secure access to the Analytics team's VPC avoiding the public internet.",
    slots: [
      { id: "app1", label: "Data App", hint: "VPC A Compute", x: 25, y: 50, expected: "ec2" },
      { id: "peer", label: "VPC Peering", hint: "Private Link", x: 50, y: 50, expected: "vpc_peering" },
      { id: "app2", label: "Analytics DB", hint: "VPC B Database", x: 75, y: 50, expected: "rds" }
    ],
    zones: [
      { label: "Data VPC (10.0.0.0/16)", x: 10, y: 25, w: 30, h: 50, cls: "zone-private" },
      { label: "Analytics VPC (10.1.0.0/16)", x: 60, y: 25, w: 30, h: 50, cls: "zone-data" }
    ],
    links: [
      ["app1", "peer", "10.1.0.0/16"],
      ["peer", "app2", "10.0.0.0/16"]
    ]
  },
  "networking-4": {
    title: "Site-to-Site VPN",
    summary: "Establish an encrypted IPsec tunnel connecting an on-premises data center to your cloud VPC.",
    slots: [
      { id: "cgw", label: "Customer Gateway", hint: "On-Prem Endpoint", x: 20, y: 50, expected: "cgw" },
      { id: "vpn", label: "VPN Connection", hint: "IPsec Tunnel", x: 50, y: 50, expected: "vpn" },
      { id: "vgw", label: "Virtual Private Gateway", hint: "AWS Endpoint", x: 80, y: 50, expected: "vgw" }
    ],
    zones: [
      { label: "Corporate Data Center", x: 5, y: 20, w: 30, h: 60, cls: "zone-edge" },
      { label: "AWS Region", x: 65, y: 20, w: 30, h: 60, cls: "zone-vpc" }
    ],
    links: [
      ["cgw", "vpn", "IPsec"],
      ["vpn", "vgw", "Tunnels"]
    ]
  },
  "networking-5": {
    title: "Direct Connect Dedicated",
    summary: "Establish a dedicated, high-speed connection from on-premises to AWS.",
    slots: [
      { id: "router", label: "Customer Router", hint: "On-Prem Router", x: 20, y: 50, expected: "cgw" },
      { id: "dx", label: "Direct Connect", hint: "Physical Fiber", x: 50, y: 50, expected: "dx" },
      { id: "vgw", label: "Virtual Private Gateway", hint: "AWS Gateway", x: 80, y: 50, expected: "vgw" }
    ],
    zones: [
      { label: "Data Center", x: 5, y: 20, w: 30, h: 60, cls: "zone-edge" },
      { label: "AWS Cloud", x: 65, y: 20, w: 30, h: 60, cls: "zone-vpc" }
    ],
    links: [
      ["router", "dx", "Cross Connect"],
      ["dx", "vgw", "VIF"]
    ]
  },
  "networking-6": {
    title: "Gateway VPC Endpoints",
    summary: "Massive backups sent to S3 must never traverse the internet. Use a Gateway Endpoint.",
    slots: [
      { id: "app", label: "EC2 App", hint: "Private Backup Job", x: 30, y: 50, expected: "ec2" },
      { id: "vpce", label: "S3 Gateway Endpoint", hint: "VPC Router", x: 50, y: 30, expected: "vpc_endpoint" },
      { id: "s3", label: "S3 Bucket", hint: "Backup Storage", x: 70, y: 50, expected: "s3" }
    ],
    zones: [
      { label: "VPC", x: 10, y: 15, w: 60, h: 70, cls: "zone-vpc" },
      { label: "Private Subnet", x: 15, y: 35, w: 30, h: 40, cls: "zone-private" },
      { label: "AWS Global Network", x: 65, y: 35, w: 30, h: 40, cls: "zone-edge" }
    ],
    links: [
      ["app", "vpce", "Prefix List"],
      ["vpce", "s3", "Private AWS Link"]
    ]
  },
  "networking-7": {
    title: "AWS PrivateLink",
    summary: "Connect internal workloads privately to SaaS applications or APIs using Interface Endpoints.",
    slots: [
      { id: "app", label: "EC2 Service", hint: "Internal Consumer", x: 30, y: 50, expected: "ec2" },
      { id: "vpce", label: "Interface Endpoint", hint: "ENI Injection", x: 50, y: 50, expected: "vpc_endpoint" },
      { id: "api", label: "API Provider", hint: "SaaS Service", x: 75, y: 50, expected: "api" }
    ],
    zones: [
      { label: "Consumer VPC", x: 10, y: 25, w: 50, h: 50, cls: "zone-vpc" },
      { label: "Provider VPC", x: 65, y: 25, w: 30, h: 50, cls: "zone-edge" }
    ],
    links: [
      ["app", "vpce", "TCP 443"],
      ["vpce", "api", "VPC Endpoint Service"]
    ]
  },
  "networking-8": {
    title: "Network Load Balancing",
    summary: "Expose a high-throughput, ultra-low latency TCP service using an NLB.",
    slots: [
      { id: "igw", label: "Internet Gateway", hint: "VPC Ingress", x: 50, y: 15, expected: "igw" },
      { id: "nlb", label: "Network Load Balancer", hint: "L4 Balancing", x: 50, y: 45, expected: "nlb" },
      { id: "app1", label: "Compute Node A", hint: "App Target", x: 35, y: 75, expected: "ec2" },
      { id: "app2", label: "Compute Node B", hint: "App Target", x: 65, y: 75, expected: "ec2" }
    ],
    zones: [
      { label: "VPC", x: 10, y: 5, w: 80, h: 90, cls: "zone-vpc" },
      { label: "Public Subnet", x: 20, y: 30, w: 60, h: 30, cls: "zone-public" },
      { label: "Private Subnet", x: 20, y: 65, w: 60, h: 25, cls: "zone-private" }
    ],
    links: [
      ["igw", "nlb", "TCP Port"],
      ["nlb", "app1", "Forwarding"],
      ["nlb", "app2", "Forwarding"]
    ]
  },
  "networking-9": {
    title: "Transit Gateway Hub & Spoke",
    summary: "Simplify complex routing by centralizing connections through a single AWS Transit Gateway connecting 3 VPCs.",
    slots: [
      { id: "tgw", label: "Transit Gateway", hint: "Central Hub", x: 50, y: 50, expected: "tgw" },
      { id: "app1", label: "VPC A", hint: "Compute Spoke", x: 20, y: 25, expected: "ec2" },
      { id: "app2", label: "VPC B", hint: "Data Spoke", x: 80, y: 25, expected: "rds" },
      { id: "cgw", label: "Customer On-Prem", hint: "VPN Attachment", x: 50, y: 85, expected: "cgw" }
    ],
    zones: [
      { label: "Hub Route Domain", x: 40, y: 40, w: 20, h: 20, cls: "zone-public" }
    ],
    links: [
      ["app1", "tgw", "Attachment"],
      ["app2", "tgw", "Attachment"],
      ["cgw", "tgw", "VPN Attachment"]
    ]
  }
};

window.PALETTE = [
  { id: "route53", label: "Global Traffic Resolver", icon: "Res_Amazon-Route-53-Hosted-Zone_48.png" },
  { id: "cloudfront", label: "Regional Distribution Node", icon: "Res_Amazon-CloudFront_Download-Distribution_48.png" },
  { id: "igw", label: "Network Ingress Bridge", icon: "Res_Amazon-VPC_Internet-Gateway_48.png" },
  { id: "alb", label: "Application Request Router", icon: "Res_Elastic-Load-Balancing_Application-Load-Balancer_48.png" },
  { id: "ec2", label: "Virtual Compute Instance", icon: "Res_Amazon-EC2_Instance_48.png" },
  { id: "rds", label: "Relational Data Cluster", icon: "Res_Amazon-RDS_Multi-AZ_48.png" },
  { id: "s3", label: "Scalable Object Repository", icon: "Res_Amazon-Simple-Storage-Service_Bucket_48.png" },
  { id: "nat", label: "Secure Address Translator", icon: "Res_Amazon-VPC_NAT-Gateway_48.png" },
  { id: "api", label: "API Frontier Interface", icon: "Res_Amazon-API-Gateway_Endpoint_48.png" },
  { id: "route", label: "Traffic Path Definition", icon: "Res_Amazon-Route-53_Route-Table_48.png" },

  { id: "vpc_peering", label: "Inter-Network Connector", icon: "Res_Amazon-VPC_Peering-Connection_48.png" },
  { id: "vgw", label: "Secure VPC Backplane", icon: "Res_Amazon-VPC_VPN-Gateway_48.png" },
  { id: "cgw", label: "On-Premises Link Point", icon: "Res_Amazon-VPC_Customer-Gateway_48.png" },
  { id: "tgw", label: "Central Transit Hub", icon: "Arch_AWS-Transit-Gateway_48.png" },
  { id: "vpc_endpoint", label: "Private Service Interface", icon: "Res_Amazon-VPC_Endpoints_48.png" },
  { id: "nlb", label: "High-Throughput L4 Router", icon: "Res_Elastic-Load-Balancing_Network-Load-Balancer_48.png" },
  { id: "dx", label: "Dedicated Fiber Circuit", icon: "Arch_AWS-Direct-Connect_48.png" },
  { id: "vpn", label: "Encrypted Network Tunnel", icon: "Res_Amazon-VPC_VPN-Connection_48.png" }
];
