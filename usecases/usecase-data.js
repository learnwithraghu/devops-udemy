window.USECASE_DATA = {
  "ha-webapp": {
    title: "Highly Available Web App on AWS",
    summary:
      "Build a production-style architecture with edge routing, public ingress, private app tier, and private database.",
    slots: [
      { id: "dns", label: "Route 53", hint: "Public DNS", x: 18, y: 12, expected: "route53" },
      { id: "cdn", label: "CloudFront", hint: "Edge cache", x: 34, y: 12, expected: "cloudfront" },
      { id: "igw", label: "Internet Gateway", hint: "VPC ingress", x: 52, y: 30, expected: "igw" },
      { id: "alb", label: "Application Load Balancer", hint: "Public tier", x: 41, y: 45, expected: "alb" },
      { id: "app1", label: "EC2 App A", hint: "Private app", x: 31, y: 72, expected: "ec2" },
      { id: "app2", label: "EC2 App B", hint: "Private app", x: 47, y: 72, expected: "ec2" },
      { id: "db", label: "Amazon RDS", hint: "Data tier", x: 70, y: 72, expected: "rds" },
      { id: "s3", label: "S3 Bucket", hint: "Static objects", x: 87, y: 12, expected: "s3" }
    ],
    zones: [
      { label: "Edge Services", x: 7, y: 4, w: 88, h: 18, cls: "zone-edge" },
      { label: "VPC 10.0.0.0/16", x: 12, y: 24, w: 78, h: 70, cls: "zone-vpc" },
      { label: "Public Subnet", x: 16, y: 36, w: 70, h: 18, cls: "zone-public" },
      { label: "Private App Subnet", x: 16, y: 57, w: 42, h: 28, cls: "zone-private" },
      { label: "Private Data Subnet", x: 60, y: 57, w: 26, h: 28, cls: "zone-data" }
    ],
    links: [
      ["dns", "cdn", "DNS"],
      ["cdn", "igw", "HTTPS"],
      ["igw", "alb", "Ingress"],
      ["alb", "app1", "Target"],
      ["alb", "app2", "Target"],
      ["app1", "db", "SQL"],
      ["app2", "db", "SQL"],
      ["app1", "s3", "Objects"]
    ]
  },
  "nat-egress": {
    title: "Private Subnet NAT Egress",
    summary: "Place NAT in public subnet and route private instance outbound traffic through it.",
    slots: [
      { id: "igw", label: "Internet Gateway", hint: "VPC edge", x: 28, y: 12, expected: "igw" },
      { id: "alb", label: "Application Load Balancer", hint: "Public ingress", x: 42, y: 42, expected: "alb" },
      { id: "nat", label: "NAT Gateway", hint: "Public egress", x: 66, y: 42, expected: "nat" },
      { id: "route", label: "Route Table", hint: "0.0.0.0/0", x: 80, y: 42, expected: "route" },
      { id: "app", label: "EC2 App", hint: "Private compute", x: 36, y: 72, expected: "ec2" },
      { id: "db", label: "Amazon RDS", hint: "Private database", x: 68, y: 72, expected: "rds" }
    ],
    zones: [
      { label: "Internet", x: 7, y: 4, w: 88, h: 16, cls: "zone-edge" },
      { label: "VPC", x: 12, y: 22, w: 78, h: 72, cls: "zone-vpc" },
      { label: "Public Subnet", x: 16, y: 34, w: 70, h: 18, cls: "zone-public" },
      { label: "Private Subnet", x: 16, y: 57, w: 70, h: 28, cls: "zone-private" }
    ],
    links: [["igw", "alb", "Ingress"], ["app", "nat", "Egress"], ["nat", "igw", "Outbound"], ["app", "db", "SQL"]]
  },
  "edge-api-static": {
    title: "Edge API + Static Delivery",
    summary: "Use Route 53 and CloudFront at edge, then route dynamic requests through API Gateway.",
    slots: [
      { id: "dns", label: "Route 53", hint: "DNS", x: 15, y: 12, expected: "route53" },
      { id: "cdn", label: "CloudFront", hint: "CDN", x: 31, y: 12, expected: "cloudfront" },
      { id: "api", label: "API Gateway", hint: "Managed API", x: 48, y: 12, expected: "api" },
      { id: "s3", label: "S3 Bucket", hint: "Static origin", x: 71, y: 12, expected: "s3" },
      { id: "igw", label: "Internet Gateway", hint: "VPC ingress", x: 58, y: 34, expected: "igw" },
      { id: "alb", label: "Application Load Balancer", hint: "Public LB", x: 46, y: 48, expected: "alb" },
      { id: "app", label: "EC2 App", hint: "App tier", x: 46, y: 74, expected: "ec2" }
    ],
    zones: [
      { label: "Edge Layer", x: 5, y: 4, w: 90, h: 22, cls: "zone-edge" },
      { label: "VPC", x: 12, y: 28, w: 78, h: 66, cls: "zone-vpc" },
      { label: "Public Subnet", x: 16, y: 40, w: 70, h: 18, cls: "zone-public" },
      { label: "Private App Subnet", x: 24, y: 62, w: 52, h: 24, cls: "zone-private" }
    ],
    links: [["dns", "cdn", "DNS"], ["cdn", "api", "API path"], ["cdn", "s3", "Static"], ["api", "igw", "HTTPS"], ["igw", "alb", "Ingress"], ["alb", "app", "Forward"]]
  },
  "private-rds": {
    title: "Private RDS Access Pattern",
    summary: "Keep database private and allow only app-tier connectivity.",
    slots: [
      { id: "igw", label: "Internet Gateway", hint: "Ingress", x: 30, y: 20, expected: "igw" },
      { id: "alb", label: "Application Load Balancer", hint: "Public LB", x: 44, y: 38, expected: "alb" },
      { id: "app", label: "EC2 App", hint: "App", x: 36, y: 65, expected: "ec2" },
      { id: "db", label: "Amazon RDS", hint: "Private DB", x: 67, y: 65, expected: "rds" }
    ],
    zones: [
      { label: "VPC", x: 12, y: 14, w: 78, h: 78, cls: "zone-vpc" },
      { label: "Public Subnet", x: 16, y: 30, w: 70, h: 18, cls: "zone-public" },
      { label: "Private App", x: 16, y: 55, w: 36, h: 28, cls: "zone-private" },
      { label: "Private Data", x: 56, y: 55, w: 30, h: 28, cls: "zone-data" }
    ],
    links: [["igw", "alb", "Ingress"], ["alb", "app", "Target"], ["app", "db", "SQL"]]
  },
  "cdn-s3-static": {
    title: "CloudFront + S3 Static Site",
    summary: "Build a global static delivery pattern using Route 53, CloudFront, and S3.",
    slots: [
      { id: "dns", label: "Route 53", hint: "DNS", x: 20, y: 18, expected: "route53" },
      { id: "cdn", label: "CloudFront", hint: "CDN", x: 40, y: 18, expected: "cloudfront" },
      { id: "s3", label: "S3 Bucket", hint: "Static origin", x: 65, y: 18, expected: "s3" }
    ],
    zones: [{ label: "Edge + Origin", x: 10, y: 8, w: 80, h: 50, cls: "zone-edge" }],
    links: [["dns", "cdn", "DNS"], ["cdn", "s3", "Origin"]]
  },
  "api-to-ec2": {
    title: "API Gateway to EC2 App",
    summary: "Front API requests at edge and route into VPC app tier.",
    slots: [
      { id: "api", label: "API Gateway", hint: "API front door", x: 28, y: 18, expected: "api" },
      { id: "igw", label: "Internet Gateway", hint: "VPC ingress", x: 46, y: 30, expected: "igw" },
      { id: "alb", label: "Application Load Balancer", hint: "Public LB", x: 46, y: 47, expected: "alb" },
      { id: "app", label: "EC2 App", hint: "Private app", x: 46, y: 72, expected: "ec2" }
    ],
    zones: [
      { label: "Edge", x: 10, y: 8, w: 80, h: 16, cls: "zone-edge" },
      { label: "VPC", x: 12, y: 24, w: 78, h: 68, cls: "zone-vpc" },
      { label: "Public Subnet", x: 20, y: 38, w: 58, h: 16, cls: "zone-public" },
      { label: "Private Subnet", x: 20, y: 60, w: 58, h: 24, cls: "zone-private" }
    ],
    links: [["api", "igw", "HTTPS"], ["igw", "alb", "Ingress"], ["alb", "app", "Target"]]
  },
  "ec2-to-rds": {
    title: "EC2 to RDS Pattern",
    summary: "Model a basic app-to-database architecture with private data tier.",
    slots: [
      { id: "alb", label: "Application Load Balancer", hint: "Public", x: 36, y: 35, expected: "alb" },
      { id: "app", label: "EC2 App", hint: "Compute", x: 36, y: 65, expected: "ec2" },
      { id: "db", label: "Amazon RDS", hint: "Database", x: 66, y: 65, expected: "rds" }
    ],
    zones: [
      { label: "VPC", x: 12, y: 20, w: 78, h: 70, cls: "zone-vpc" },
      { label: "Public", x: 18, y: 30, w: 64, h: 18, cls: "zone-public" },
      { label: "Private", x: 18, y: 56, w: 64, h: 28, cls: "zone-private" }
    ],
    links: [["alb", "app", "Target"], ["app", "db", "SQL"]]
  },
  "s3-log-pipeline": {
    title: "S3 Log Collection Pattern",
    summary: "Practice ingest and storage flow where app tier writes logs to S3.",
    slots: [
      { id: "alb", label: "Application Load Balancer", hint: "Ingress", x: 34, y: 30, expected: "alb" },
      { id: "app", label: "EC2 App", hint: "Log producer", x: 34, y: 60, expected: "ec2" },
      { id: "s3", label: "S3 Bucket", hint: "Log store", x: 66, y: 60, expected: "s3" }
    ],
    zones: [
      { label: "VPC", x: 12, y: 20, w: 78, h: 70, cls: "zone-vpc" },
      { label: "App Subnet", x: 18, y: 40, w: 32, h: 32, cls: "zone-private" },
      { label: "Storage", x: 54, y: 40, w: 30, h: 32, cls: "zone-data" }
    ],
    links: [["alb", "app", "Requests"], ["app", "s3", "Logs"]]
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
  { id: "route53", label: "Route 53 Hosted Zone", icon: "Res_Amazon-Route-53-Hosted-Zone_48.png" },
  { id: "cloudfront", label: "CloudFront Distribution", icon: "Res_Amazon-CloudFront_Download-Distribution_48.png" },
  { id: "igw", label: "Internet Gateway", icon: "Res_Amazon-VPC_Internet-Gateway_48.png" },
  { id: "alb", label: "Application Load Balancer", icon: "Res_Elastic-Load-Balancing_Application-Load-Balancer_48.png" },
  { id: "ec2", label: "EC2 Instance", icon: "Res_Amazon-EC2_Instance_48.png" },
  { id: "rds", label: "RDS Multi-AZ", icon: "Res_Amazon-RDS_Multi-AZ_48.png" },
  { id: "s3", label: "S3 Bucket", icon: "Res_Amazon-Simple-Storage-Service_Bucket_48.png" },
  { id: "nat", label: "NAT Gateway", icon: "Res_Amazon-VPC_NAT-Gateway_48.png" },
  { id: "api", label: "API Gateway Endpoint", icon: "Res_Amazon-API-Gateway_Endpoint_48.png" },
  { id: "route", label: "Route Table", icon: "Res_Amazon-Route-53_Route-Table_48.png" },

  { id: "vpc_peering", label: "VPC Peering Connection", icon: "Res_Amazon-VPC_Peering-Connection_48.png" },
  { id: "vgw", label: "Virtual Private Gateway", icon: "Res_Amazon-VPC_VPN-Gateway_48.png" },
  { id: "cgw", label: "Customer Gateway", icon: "Res_Amazon-VPC_Customer-Gateway_48.png" },
  { id: "tgw", label: "Transit Gateway", icon: "Arch_AWS-Transit-Gateway_48.png" },
  { id: "vpc_endpoint", label: "VPC Endpoint", icon: "Res_Amazon-VPC_Endpoints_48.png" },
  { id: "nlb", label: "Network Load Balancer", icon: "Res_Elastic-Load-Balancing_Network-Load-Balancer_48.png" },
  { id: "dx", label: "Direct Connect", icon: "Arch_AWS-Direct-Connect_48.png" },
  { id: "vpn", label: "Site-to-Site VPN", icon: "Res_Amazon-VPC_VPN-Connection_48.png" }

];
