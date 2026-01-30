import { Experience, Project, SocialLink, SectionId } from './types';

export const NAV_LINKS = [
  { id: SectionId.WORK, label: '工程展示' },
  { id: SectionId.ABOUT, label: '技术栈' },
  { id: SectionId.EXPERIENCE, label: '职业轨迹' },
  { id: SectionId.CONTACT, label: '联系我' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: '智能家居中枢',
    category: 'IoT / 嵌入式开发',
    description: '基于 ESP32 与 Zigbee 协议的家庭自动化网关，自主设计的 PCB 与 3D 打印外壳。',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    year: '2024',
    tags: ['C++', 'PCB Design', 'MQTT', 'React Native'],
  },
  {
    id: '2',
    title: '分布式云架构',
    category: '后端架构 / K8s',
    description: '高并发微服务系统，支持实时数据流处理，服务于工业监控场景。',
    imageUrl: 'https://picsum.photos/800/800?random=11',
    year: '2023',
    tags: ['Go', 'Kubernetes', 'gRPC', 'TimescaleDB'],
  },
  {
    id: '3',
    title: 'FPGA 图像加速器',
    category: '硬件加速 / Verilog',
    description: '利用 FPGA 进行边缘计算图像预处理，显著降低了后端传输带宽。',
    imageUrl: 'https://picsum.photos/600/800?random=12',
    year: '2022',
    tags: ['Verilog', 'Xilinx', 'Computer Vision'],
  },
  {
    id: '4',
    title: 'SaaS 仪表盘系统',
    category: '全栈开发',
    description: '极简风格的数据可视化平台，为硬件设备提供远程管理界面。',
    imageUrl: 'https://picsum.photos/800/500?random=13',
    year: '2023',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: '高级嵌入式工程师 & 全栈开发者',
    company: 'Future Robotics Ltd.',
    period: '2022 - 至今',
    description: '负责下一代机器人控制系统的底层驱动编写(C/Rust)及上位机控制软件(Electron/React)的开发。',
  },
  {
    id: '2',
    role: '硬件工程师',
    company: 'Silicon Valley IoT',
    period: '2020 - 2022',
    description: '主导两款智能穿戴设备的电路原理图设计与多层板 Layout，并将固件功耗降低了 40%。',
  },
  {
    id: '3',
    role: '软件工程师',
    company: 'Cloud Systems Inc.',
    period: '2018 - 2020',
    description: '构建高可用的后端 API 服务，并完成了从单体架构到微服务的迁移。',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: '#', icon: 'github' },
  { name: 'StackOverflow', url: '#', icon: 'stackoverflow' },
  { name: 'LinkedIn', url: '#', icon: 'linkedin' },
  { name: 'Bilibili', url: '#', icon: 'bilibili' },
];