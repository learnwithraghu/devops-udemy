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
  { id: "route", label: "Route Table", icon: "Res_Amazon-Route-53_Route-Table_48.png" }
];
