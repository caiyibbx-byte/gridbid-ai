import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Users, Award, FileText, ChevronRight, BrainCircuit,
  RefreshCw, Download, Save,
  Search, X, Sparkles, Check,
  ArrowUp, ArrowDown,
  BadgeCheck, Zap, Layers,
  UserPlus, CheckCircle2,
  Plus, DatabaseZap,
  Bot, GraduationCap,
  Scale,
  FileDown,
  Trash2,
  ShieldCheck,
  Briefcase,
  Trophy,
  BookOpen,
  Image as ImageIcon,
  School,
  FileImage,
  Lock,
  Eye,
  ShieldAlert,
  CalendarDays,
  Coins,
  Building2,
  MapPin,
  ClipboardList,
  Info,
  ExternalLink,
  Target,
  History,
  FileCheck2,
  UserSearch,
  Type,
  List,
  ListOrdered,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  MessageSquarePlus,
  Paperclip,
  Send,
  Wand2,
  FileUp,
  FileStack,
  Medal,
  Activity,
  UserCheck,
  ChevronLeft,
  LockKeyhole,
  UnlockKeyhole,
  ShieldHalf,
  Filter,
  UserPlus2,
  SearchCode,
  Maximize2,
  FileArchive,
  FileCheck,
  Layout,
  Star
} from 'lucide-react';
import { BiddingTask, StaffUser, Personnel, ProjectExperience, PhaseStatus } from '../types';

interface BidWorkspaceViewProps {
  currentTask?: BiddingTask;
  currentUser: StaffUser | null;
  onUpdateTask?: (task: BiddingTask) => void;
  onBack?: () => void;
}

interface TaskStatus {
  id: 'team' | 'exp' | 'content';
  name: string;
  status: PhaseStatus;
  progress: number;
  icon: any;
  color: string;
}

interface ReferenceFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadTime: string;
}

// --------------------------------------------------------------------------------
// 极致 Word 仿真组件：项目业绩全案 (A4 布局)
// --------------------------------------------------------------------------------
const ProjectFullDocumentMerged: React.FC<{ project: ProjectExperience }> = ({ project }) => (
  <div className="flex flex-col items-center space-y-16 mb-40 animate-in fade-in duration-700">
    <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif p-[25.4mm] flex flex-col shrink-0 overflow-hidden" style={{ width: '210mm', minHeight: '297mm', border: '1px solid #e2e8f0' }}>
      <div className="absolute top-[15mm] right-[20mm] px-4 py-1 border border-slate-400 text-[9pt] text-slate-400 italic font-sans uppercase tracking-widest">Archive Copy - GridBid AI</div>
      <h2 className="text-[18pt] font-bold text-center mb-[15mm] tracking-[4pt] underline underline-offset-[12px] decoration-slate-900">项目基本情况表</h2>
      <table className="w-full border-collapse border-[1.5pt] border-black text-[10.5pt] leading-[1.8]">
        <tbody>
          <tr><td className="border border-black p-3 bg-slate-50 w-[140px] font-bold text-center">项目名称</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.projectName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目所在地</td><td className="border border-black p-3" colSpan={3}>{project.location}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人名称</td><td className="border border-black p-3" colSpan={3}>{project.clientName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人地址</td><td className="border border-black p-3" colSpan={3}>{project.clientAddress}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人电话</td><td className="border border-black p-3" colSpan={3}>{project.contact} / {project.phone}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">合同价格</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.amount} 万元</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">开工日期</td><td className="border border-black p-3 font-mono" colSpan={3}>{project.signingDate}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">竣工日期</td><td className="border border-black p-3 font-mono" colSpan={3}>{project.endDate}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[120px]">承担的工作</td><td className="border border-black p-3 align-top italic leading-relaxed" colSpan={3}>{project.leaderExperience}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">工程质量</td><td className="border border-black p-3" colSpan={3}>{project.quality}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目负责人</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.leader}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[200px]">项目描述</td><td className="border border-black p-3 text-justify align-top font-serif leading-relaxed" colSpan={3}>{project.content}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">其他说明</td><td className="border border-black p-3 italic text-slate-500" colSpan={3}>{project.remarks || '无'}</td></tr>
        </tbody>
      </table>
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40">
        <span className="text-[9pt] font-sans">导出日期：{new Date().toLocaleDateString()}</span>
        <span className="text-[9pt] font-sans">Page 1</span>
      </div>
    </div>
    {project.contractScanUrls?.map((url, i) => (
      <div key={`contract-${i}`} className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif p-[20mm] transition-all flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm', border: '1px solid #e2e8f0' }}>
        <h3 className="text-[14pt] font-bold border-l-[6pt] border-black pl-4 mb-10 tracking-wider">附件一：项目合同关键页扫描件 ({i + 1})</h3>
        <div className="flex-1 flex flex-col items-center justify-center border-[0.5pt] border-slate-100 bg-slate-50/30 p-4">
          <img src={url} alt="contract" className="max-w-full max-h-full object-contain shadow-lg" />
        </div>
      </div>
    ))}
  </div>
);

// --------------------------------------------------------------------------------
// 人员资历仿真组件 (A4 布局)
// --------------------------------------------------------------------------------
const PersonnelFullDocumentMerged: React.FC<{ person: Personnel; isLeader?: boolean }> = ({ person, isLeader }) => (
  <div className="flex flex-col items-center space-y-16 mb-40 animate-in fade-in duration-700">
    <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm', border: '1px solid #e2e8f0' }}>
      <div className="absolute top-10 right-10 px-4 py-1 border border-slate-300 text-[8pt] text-slate-300 uppercase">Registry Personnel Form V3.1</div>
      {isLeader && (
        <div className="absolute top-10 left-10 text-blue-600 flex items-center space-x-2 animate-pulse">
          <Star size={18} fill="currentColor" />
          <span className="text-[10pt] font-black uppercase tracking-widest font-sans italic">Project Leader</span>
        </div>
      )}
      <h2 className="text-[18pt] font-black text-center mb-10 tracking-[3pt] underline underline-offset-[12px] decoration-slate-900">{isLeader ? `项目负责人——${person.name}个人简历及相关证书` : `${person.name}个人简历及相关证书`}</h2>
      <table className="w-full border-collapse border-[1.5pt] border-black text-[10.5pt] leading-[1.8]">
        <tbody>
          <tr>
            <td className="border border-black p-2 bg-slate-50 w-[90px] font-bold text-center italic">姓 名</td>
            <td className="border border-black p-2 text-center w-[120px] font-bold">{person.name}</td>
            <td className="border border-black p-2 bg-slate-50 w-[90px] font-bold text-center italic">年 龄</td>
            <td className="border border-black p-2 text-center w-[80px]">{person.age}</td>
            <td className="border border-black p-2 bg-slate-50 w-[130px] font-bold text-center leading-tight italic">执业资格/岗位证书</td>
            <td className="border border-black p-2 align-top text-[9.5pt]">
              {person.certs.map((c, i) => <div key={i}>● {c.name}</div>)}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">职 称</td>
            <td className="border border-black p-2 text-center">{person.title}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">学 历</td>
            <td className="border border-black p-2 text-center">{person.education}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center leading-tight italic">拟在本项目任职</td>
            <td className="border border-black p-2 text-center font-bold text-blue-800">{person.proposedPosition}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">总工龄</td>
            <td className="border border-black p-2 text-center font-bold">{person.years} 年</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic" colSpan={2}>从事类似工作年限</td>
            <td className="border border-black p-2 text-center font-bold text-emerald-800" colSpan={2}>{person.similarYears} 年</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">毕业学校</td>
            <td className="border border-black p-3 text-center" colSpan={5}>
              <span className="font-bold">{person.gradDate}</span> 年毕业于 <span className="font-bold underline">{person.school}</span> {person.major} 专业
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-100 font-bold text-center uppercase tracking-[4pt]" colSpan={6}>主 要 工 正 经 历</td>
          </tr>
          <tr className="bg-slate-50 text-[9.5pt] font-bold">
            <td className="border border-black p-2 text-center">时间周期</td>
            <td className="border border-black p-2 text-center" colSpan={3}>参加过的类似项目名称</td>
            <td className="border border-black p-2 text-center">担任职务</td>
            <td className="border border-black p-2 text-center">证明人及电话</td>
          </tr>
          {person.projects.map((proj, idx) => (
            <tr key={idx}>
              <td className="border border-black p-2 text-center text-[9pt] font-mono">{proj.time}</td>
              <td className="border border-black p-2 text-[10pt] leading-relaxed italic" colSpan={3}>{proj.projectName}</td>
              <td className="border border-black p-2 text-center text-[9.5pt] font-bold">{proj.role}</td>
              <td className="border border-black p-2 text-center text-[9pt]">
                <div className="font-bold">{proj.contact}</div>
                <div className="text-slate-500 mt-1 font-mono">{proj.phone}</div>
              </td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 10 - person.projects.length) }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-10">
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2" colSpan={3}></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40 text-[9pt]">
        <span>GridBid AI 资历归档中心</span>
        <span className="italic">Page 1</span>
      </div>
    </div>
    
    {person.educations.some(e => e.gradCertUrl || e.degreeCertUrl) && (
      <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-[20mm] mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
         <h3 className="text-lg font-bold border-l-4 border-black pl-4 mb-10">附件：学历及学位证书扫描件</h3>
         <div className="grid grid-cols-2 gap-8">
            {person.educations.map((edu, i) => (
              <div key={i} className="space-y-4">
                 <p className="text-xs font-bold text-slate-500 uppercase">{edu.level} - {edu.school}</p>
                 {edu.gradCertUrl && <img src={edu.gradCertUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" />}
                 {edu.degreeCertUrl && <img src={edu.degreeCertUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" />}
              </div>
            ))}
         </div>
      </div>
    )}

    {person.certs.filter(c => c.fileUrl).map((c, i) => (
      <div key={`cert-${i}`} className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-[20mm] mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
         <h3 className="text-lg font-bold border-l-4 border-black pl-4 mb-10">附件：执业资格证书 ({c.name})</h3>
         <img src={c.fileUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" />
      </div>
    ))}
  </div>
);

// --------------------------------------------------------------------------------
// 主工作空间组件
// --------------------------------------------------------------------------------
const BidWorkspaceView: React.FC<BidWorkspaceViewProps> = ({ currentTask, currentUser, onUpdateTask, onBack }) => {
  // 全员协作模式：取消权限限制
  const canEditTeam = true;
  const canEditExp = true;
  const canEditContent = true;

  const getActiveCanEdit = () => true;

  // 全量模拟数据
  const fullPersonnelPool: Personnel[] = [
    { id: 's-huang', name: '黄石亮', age: 40, education: '本科', title: '高级顾问', proposedPosition: '咨询顾问', years: 17, similarYears: 15, school: '中山大学', major: '计算机', gradDate: '2013', currentLoad: 0.6, educations: [{ level: '本科', school: '中山大学', major: '计算机', gradDate: '2013', gradCertUrl: 'https://placehold.co/800x600?text=Grad+Cert', degreeCertUrl: 'https://placehold.co/800x600?text=Degree+Cert' }], certs: [{ name: 'PMP证书', level: '高级', authority: 'PMI', number: 'PMP-123', validity: '2027', fileUrl: 'https://placehold.co/600x800?text=PMP+Cert' }], projects: [{ time: '2022', projectName: '南网科技成果转化咨询', role: '负责人', client: '南网', contact: '游X', phone: '156...', serviceType: '咨询' }] },
    { id: 's-zhang-wei', name: '张维国', age: 45, education: '博士', title: '教授级高级工程师', proposedPosition: '技术总监', years: 22, similarYears: 18, school: '清华大学', major: '电力自动化', gradDate: '2008', currentLoad: 0.4, educations: [{ level: '博士', school: '清华大学', major: '电力系统及其自动化', gradDate: '2008', gradCertUrl: 'https://placehold.co/800x600?text=Tsinghua+PhD+Grad' }], certs: [{ name: '注册电气工程师', level: '执业', authority: '人社', number: 'DG-001', validity: '2028', fileUrl: 'https://placehold.co/600x800?text=Electrical+Cert' }], projects: [{ time: '2021', projectName: '±800kV特高压运维项目', role: '总监', client: '国网', contact: '王主任', phone: '010...', serviceType: '运维' }] },
    { id: 's-li-ming', name: '李明', age: 38, education: '硕士', title: '高级架构师', proposedPosition: '架构负责人', years: 15, similarYears: 12, school: '西安交大', major: '软件工程', gradDate: '2012', currentLoad: 0.3, educations: [{ level: '硕士', school: '西安交通大学', major: '软件工程', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=XJTU+Master+Grad' }], certs: [{ name: 'AWS 解决方案架构师认证', level: '专家级', authority: 'Amazon', number: 'AWS-SA-123', validity: '2025-10', fileUrl: 'https://placehold.co/600x800?text=AWS+Arch+Cert' }, { name: '系统分析师', level: '高级', authority: '工信部', number: 'SA-999', validity: '永久', fileUrl: '' }], projects: [{ time: '2023', projectName: '国网新源数字化审计平台', role: '架构师', client: '新源', contact: '李工', phone: '138...', serviceType: '开发' }] },
    { id: 's-wang-fang', name: '王芳', age: 35, education: '硕士', title: '高级工程师', proposedPosition: '项目经理', years: 12, similarYears: 10, school: '华中科技大学', major: '电气工程', gradDate: '2014', currentLoad: 0.5, educations: [{ level: '硕士', school: '华中科技大学', major: '电气工程及其自动化', gradDate: '2014', gradCertUrl: 'https://placehold.co/800x600?text=HUST+Grad', degreeCertUrl: '' }], certs: [{ name: '注册咨询工程师', level: '执业', authority: '国家发改委', number: 'ZX-20140321', validity: '2026', fileUrl: '' }], projects: [{ time: '2023', projectName: '广东电网配网智能化改造', role: '项目经理', client: '广东电网', contact: '林总', phone: '139...', serviceType: '工程管理' }] },
    { id: 's-chen-bo', name: '陈博', age: 42, education: '本科', title: '高级工程师', proposedPosition: '运维专家', years: 19, similarYears: 16, school: '武汉大学', major: '计算机科学', gradDate: '2006', currentLoad: 0.7, educations: [{ level: '本科', school: '武汉大学', major: '计算机科学与技术', gradDate: '2006', gradCertUrl: 'https://placehold.co/800x600?text=WHU+Grad', degreeCertUrl: '' }], certs: [{ name: 'CISSP信息安全认证', level: '国际', authority: 'ISC²', number: 'CISSP-88321', validity: '2026', fileUrl: '' }], projects: [{ time: '2022', projectName: '国网信息安全等保三级评估', role: '安全顾问', client: '国网', contact: '赵处长', phone: '010...', serviceType: '安全评估' }] },
    { id: 's-liu-yang', name: '刘洋', age: 33, education: '硕士', title: '工程师', proposedPosition: '数据分析师', years: 9, similarYears: 7, school: '浙江大学', major: '数据科学', gradDate: '2017', currentLoad: 0.2, educations: [{ level: '硕士', school: '浙江大学', major: '数据科学与大数据技术', gradDate: '2017', gradCertUrl: 'https://placehold.co/800x600?text=ZJU+Grad', degreeCertUrl: '' }], certs: [{ name: '大数据分析师', level: '中级', authority: '工信部', number: 'BD-2017-456', validity: '永久', fileUrl: '' }], projects: [{ time: '2024', projectName: '南网电力数据治理平台', role: '数据架构师', client: '南方电网', contact: '吴经理', phone: '020...', serviceType: '数据治理' }] },
    { id: 's-sun-lei', name: '孙磊', age: 48, education: '本科', title: '教授级高级工程师', proposedPosition: '首席顾问', years: 25, similarYears: 20, school: '北京大学', major: '物理', gradDate: '2000', currentLoad: 0.3, educations: [{ level: '本科', school: '北京大学', major: '物理学', gradDate: '2000', gradCertUrl: 'https://placehold.co/800x600?text=PKU+Grad', degreeCertUrl: '' }], certs: [{ name: '电力行业职业资格证', level: '正高级', authority: '中国电机工程学会', number: 'CSEE-001', validity: '永久', fileUrl: '' }], projects: [{ time: '2020', projectName: '国家电网碳中和战略规划', role: '首席顾问', client: '国家电网', contact: '张副总', phone: '010...', serviceType: '战略咨询' }] },
    { id: 's-zhao-xin', name: '赵鑫', age: 30, education: '硕士', title: '工程师', proposedPosition: '前端开发', years: 7, similarYears: 5, school: '同济大学', major: '软件工程', gradDate: '2019', currentLoad: 0.4, educations: [{ level: '硕士', school: '同济大学', major: '软件工程', gradDate: '2019', gradCertUrl: 'https://placehold.co/800x600?text=TJU+Grad', degreeCertUrl: '' }], certs: [], projects: [{ time: '2023', projectName: '电力营销系统前端重构', role: '前端负责人', client: '华东电力', contact: '方主管', phone: '021...', serviceType: '软件开发' }] },
    { id: 's-wu-jing', name: '吴静', age: 37, education: '博士', title: '副研究员', proposedPosition: '研究顾问', years: 13, similarYears: 10, school: '上海交通大学', major: '电力经济', gradDate: '2013', currentLoad: 0.5, educations: [{ level: '博士', school: '上海交通大学', major: '电力经济与政策', gradDate: '2013', gradCertUrl: 'https://placehold.co/800x600?text=SJTU+PhD+Grad', degreeCertUrl: '' }], certs: [{ name: '经济师', level: '高级', authority: '人社部', number: 'ECON-2013-789', validity: '永久', fileUrl: '' }], projects: [{ time: '2023', projectName: '电力市场化改革政策研究', role: '课题负责人', client: '国家能源局', contact: '刘司长', phone: '010...', serviceType: '政策研究' }] },
    { id: 's-guo-peng', name: '郭鹏', age: 44, education: '本科', title: '高级工程师', proposedPosition: '变电专家', years: 21, similarYears: 18, school: '西南交通大学', major: '电气工程', gradDate: '2004', currentLoad: 0.8, educations: [{ level: '本科', school: '西南交通大学', major: '电气工程及其自动化', gradDate: '2004', gradCertUrl: 'https://placehold.co/800x600?text=SWJTU+Grad', degreeCertUrl: '' }], certs: [{ name: '注册电气工程师（供配电）', level: '执业', authority: '人社部', number: 'GP-2004-012', validity: '2027', fileUrl: '' }], projects: [{ time: '2022', projectName: '重庆电网500kV变电站改扩建', role: '总工程师', client: '重庆电力', contact: '周经理', phone: '023...', serviceType: 'EPC' }] },
    { id: 's-tang-min', name: '唐敏', age: 31, education: '硕士', title: '工程师', proposedPosition: '文档工程师', years: 8, similarYears: 6, school: '北京邮电大学', major: '信息管理', gradDate: '2018', currentLoad: 0.3, educations: [{ level: '硕士', school: '北京邮电大学', major: '信息管理与信息系统', gradDate: '2018', gradCertUrl: 'https://placehold.co/800x600?text=BUPT+Grad', degreeCertUrl: '' }], certs: [{ name: '档案管理师', level: '中级', authority: '国家档案局', number: 'DA-2018-234', validity: '永久', fileUrl: '' }], projects: [{ time: '2024', projectName: '国网技术标书规范化整理', role: '文档负责人', client: '国家电网', contact: '钱主任', phone: '010...', serviceType: '文档管理' }] },
    { id: 's-he-chao', name: '何超', age: 39, education: '硕士', title: '高级工程师', proposedPosition: '通信专家', years: 16, similarYears: 13, school: '电子科技大学', major: '通信工程', gradDate: '2010', currentLoad: 0.6, educations: [{ level: '硕士', school: '电子科技大学', major: '通信与信息系统', gradDate: '2010', gradCertUrl: 'https://placehold.co/800x600?text=UESTC+Grad', degreeCertUrl: '' }], certs: [{ name: '高级通信工程师', level: '高级', authority: '工信部', number: 'COMM-2010-567', validity: '永久', fileUrl: '' }], projects: [{ time: '2023', projectName: '贵州电网骨干通信网升级', role: '通信负责人', client: '贵州电网', contact: '陈总工', phone: '0851...', serviceType: '通信工程' }] },
    { id: 's-feng-yun', name: '冯云', age: 36, education: '本科', title: '高级工程师', proposedPosition: '后勤保障', years: 13, similarYears: 11, school: '南京师范大学', major: '管理学', gradDate: '2012', currentLoad: 0.4, educations: [{ level: '本科', school: '南京师范大学', major: '工商管理', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=NJNU+Grad', degreeCertUrl: '' }], certs: [{ name: '项目管理专业人士（PMP）', level: '国际', authority: 'PMI', number: 'PMP-56789', validity: '2028', fileUrl: '' }], projects: [{ time: '2022', projectName: '国网山东后勤服务综合项目', role: '后勤总协调', client: '国网山东', contact: '杨主任', phone: '0531...', serviceType: '后勤管理' }] },
    { id: 's-jiang-hao', name: '蒋浩', age: 43, education: '博士', title: '研究员', proposedPosition: '技术咨询', years: 20, similarYears: 17, school: '哈尔滨工业大学', major: '控制工程', gradDate: '2006', currentLoad: 0.5, educations: [{ level: '博士', school: '哈尔滨工业大学', major: '控制理论与控制工程', gradDate: '2006', gradCertUrl: 'https://placehold.co/800x600?text=HIT+PhD+Grad', degreeCertUrl: '' }], certs: [{ name: '控制工程师', level: '高级', authority: '中国自动化学会', number: 'CAA-2006-098', validity: '永久', fileUrl: '' }], projects: [{ time: '2021', projectName: '西北电网调度自动化系统研究', role: '研究员', client: '西北电网', contact: '马总', phone: '029...', serviceType: '技术研究' }] },
    { id: 's-lin-rui', name: '林瑞', age: 29, education: '本科', title: '助理工程师', proposedPosition: '技术支持', years: 5, similarYears: 4, school: '厦门大学', major: '电子信息', gradDate: '2021', currentLoad: 0.2, educations: [{ level: '本科', school: '厦门大学', major: '电子信息工程', gradDate: '2021', gradCertUrl: 'https://placehold.co/800x600?text=XMU+Grad', degreeCertUrl: '' }], certs: [], projects: [{ time: '2024', projectName: '福建电力计量系统运维', role: '技术支持工程师', client: '国网福建', contact: '郑经理', phone: '0591...', serviceType: '技术支持' }] },
    { id: 's-xu-qiang', name: '徐强', age: 46, education: '硕士', title: '高级经济师', proposedPosition: '商务经理', years: 23, similarYears: 19, school: '对外经济贸易大学', major: '国际贸易', gradDate: '2002', currentLoad: 0.7, educations: [{ level: '硕士', school: '对外经济贸易大学', major: '国际贸易学', gradDate: '2002', gradCertUrl: 'https://placehold.co/800x600?text=UIBE+Grad', degreeCertUrl: '' }], certs: [{ name: '高级经济师', level: '高级', authority: '人社部', number: 'ECON-H-2002-321', validity: '永久', fileUrl: '' }], projects: [{ time: '2023', projectName: '电力国际合作项目商务谈判', role: '商务总监', client: '华电集团', contact: '孟副总', phone: '010...', serviceType: '商务管理' }] },
  ];

  const fullProjectPool: ProjectExperience[] = [
    { id: 'p1', contractYear: '2021', index: 1, projectType: '营销服务', projectName: '海口局2021客服宣传项目', keywords: ['宣传', '营商环境'], amount: '61.0', signingDate: '2021-10', endDate: '2021-12', clientName: '海口局', clientAddress: '海口', location: '海南', quality: '优', leader: '黄石亮', leaderExperience: '总负责', content: '设计海报、编制故事。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '5/3', memberExperience: '', phone: '186...', contact: '张主任', remarks: '' },
    { id: 'p2', contractYear: '2022', index: 2, projectType: '变电类', projectName: '广州局220kV天河站数字化改造', keywords: ['变电', 'EPC', '数字化'], amount: '1280.5', signingDate: '2022-03', endDate: '2022-12', clientName: '广州局', clientAddress: '广州', location: '广东', quality: '优', leader: '王志强', leaderExperience: '项目经理', content: '全站数字化升级调试。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '18/12', memberExperience: '', phone: '139...', contact: '陈经理', remarks: '' },
    { id: 'p3', contractYear: '2023', index: 3, projectType: '技术服务类', projectName: '深圳局2023无人机巡检算法服务', keywords: ['无人机', 'AI', '算法'], amount: '185.0', signingDate: '2023-01', endDate: '2023-12', clientName: '深圳局', clientAddress: '深圳', location: '广东', quality: '合格', leader: '刘思源', leaderExperience: '技术负责人', content: '开发缺陷识别AI模型。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '8/6', memberExperience: '', phone: '137...', contact: '林主管', remarks: '' },
    { id: 'p4', contractYear: '2022', index: 4, projectType: '线路类', projectName: '国网浙江500kV甬舟线路改造工程', keywords: ['线路', '500kV', '改造'], amount: '3450.0', signingDate: '2022-05', endDate: '2023-06', clientName: '国网浙江电力', clientAddress: '杭州', location: '浙江', quality: '优', leader: '陈国栋', leaderExperience: '总工程师', content: '500kV架空线路新建及改造施工。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '35/25', memberExperience: '', phone: '135...', contact: '王总监', remarks: '' },
    { id: 'p5', contractYear: '2023', index: 5, projectType: '信通类', projectName: '南网广东配网自动化系统升级项目', keywords: ['配网', '自动化', 'SCADA'], amount: '876.0', signingDate: '2023-04', endDate: '2023-11', clientName: '广东电网', clientAddress: '广州', location: '广东', quality: '优', leader: '李明华', leaderExperience: '系统架构师', content: '配电自动化终端改造与主站系统升级。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '14/10', memberExperience: '', phone: '138...', contact: '赵主任', remarks: '' },
    { id: 'p6', contractYear: '2021', index: 6, projectType: '变电类', projectName: '云南电网110kV西双版纳变电站新建', keywords: ['变电站', '新建', '110kV'], amount: '2100.0', signingDate: '2021-06', endDate: '2022-08', clientName: '云南电网', clientAddress: '西双版纳', location: '云南', quality: '合格', leader: '张伟', leaderExperience: '项目经理', content: '110kV变电站土建与设备安装调试。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '28/20', memberExperience: '', phone: '133...', contact: '刘经理', remarks: '' },
    { id: 'p7', contractYear: '2024', index: 7, projectType: '技术服务类', projectName: '国网湖北电力碳排放监测平台建设', keywords: ['碳排放', '监测', '平台'], amount: '320.0', signingDate: '2024-01', endDate: '2024-09', clientName: '国网湖北电力', clientAddress: '武汉', location: '湖北', quality: '优', leader: '孙丽丽', leaderExperience: '产品负责人', content: '建设电力行业碳排放数据采集与分析平台。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '进行中', extendedKeywords: [], members: '10/7', memberExperience: '', phone: '136...', contact: '杨总', remarks: '' },
    { id: 'p8', contractYear: '2023', index: 8, projectType: '综合类', projectName: '国网四川2023年配网物资集中采购服务', keywords: ['物资', '采购', '配网'], amount: '540.0', signingDate: '2023-07', endDate: '2023-12', clientName: '国网四川电力', clientAddress: '成都', location: '四川', quality: '合格', leader: '周强', leaderExperience: '商务负责人', content: '配网物资框架协议采购代理服务。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '6/4', memberExperience: '', phone: '181...', contact: '钱采购', remarks: '' },
    { id: 'p9', contractYear: '2024', index: 9, projectType: '线路类', projectName: '国网江苏电力2024年城区电缆通道工程', keywords: ['电缆', '城区', '通道'], amount: '1650.0', signingDate: '2024-03', endDate: '2024-12', clientName: '国网江苏电力', clientAddress: '南京', location: '江苏', quality: '优', leader: '吴建国', leaderExperience: '总工', content: '城区地下电缆管道新建与改造。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '进行中', extendedKeywords: [], members: '22/16', memberExperience: '', phone: '182...', contact: '韩总监', remarks: '' },
    { id: 'p10', contractYear: '2022', index: 10, projectType: '信通类', projectName: '贵州电网数字孪生变电站试点项目', keywords: ['数字孪生', '变电站', '试点'], amount: '420.0', signingDate: '2022-09', endDate: '2023-05', clientName: '贵州电网', clientAddress: '贵阳', location: '贵州', quality: '优', leader: '冯小刚', leaderExperience: '技术总监', content: '构建220kV数字孪生变电站三维模型与联动系统。', contractScanUrls: [], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '9/6', memberExperience: '', phone: '189...', contact: '程副总', remarks: '' },
  ];

  const [phase, setPhase] = useState<'hub' | 'task' | 'team_preview' | 'exp_preview'>('hub');
  const [activeTaskId, setActiveTaskId] = useState<'team' | 'exp' | 'content' | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<ProjectExperience[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel[]>([]);
  
  // 新增：技术文件中的项目负责人 ID
  const [projectLeaderId, setProjectLeaderId] = useState<string | null>(null);

  // 本项目任职类型与成员任职映射
  const [projectRoleTypes, setProjectRoleTypes] = useState<string[]>(['技术咨询顾问', '文档资料管理及后勤辅助', '后台协助技术支持']);
  const [memberProjectRoles, setMemberProjectRoles] = useState<Record<string, string>>({});
  const [newRoleTypeInput, setNewRoleTypeInput] = useState('');
  const [addingRoleForId, setAddingRoleForId] = useState<string | null>(null);

  // 深度详情模态框状态
  const [detailPerson, setDetailPerson] = useState<Personnel | null>(null);
  const [detailProject, setDetailProject] = useState<ProjectExperience | null>(null);

  // 搜索与判定状态
  const [personnelSearch, setPersonnelSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [poolPage, setPoolPage] = useState(1);
  const POOL_PAGE_SIZE = 8;
  const [personnelPage, setPersonnelPage] = useState(1);
  const PERSONNEL_PAGE_SIZE = 8;
  const [isAiRecommending, setIsAiRecommending] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [expAiRecommendations, setExpAiRecommendations] = useState<any[]>([]);
  
  const [zoomLevel, setZoomLevel] = useState(100);
  const [draftContent, setDraftContent] = useState<string>(`# 技术响应方案预览\n\n## 第一章：项目实施整体思路\n针对本项目，我们将充分利用 GridGPT 引擎实现电网资产的智能化管理...`);
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([
    { id: 'ref-1', name: '国网江苏电力2023同类项目技术方案.pdf', size: '4.2MB', type: 'PDF', uploadTime: '2024-10-24 14:00' }
  ]);
  const [isFilesProcessing, setIsFilesProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiChatBottomRef = useRef<HTMLDivElement>(null);
  const expAiChatBottomRef = useRef<HTMLDivElement>(null);
  const teamAiChatBottomRef = useRef<HTMLDivElement>(null);

  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: '您好！我是 GridGPT 文档编撰助理。建议先上传相关的行业标准或以往标书作为 AI 语境参考。' }
  ]);

  const [teamAiChatInput, setTeamAiChatInput] = useState('');
  const [teamAiChatMessages, setTeamAiChatMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: '您好！我是团队匹配助手。您可以告诉我更具体的项目需求（如：需要具备海外项目经验、需要熟悉某项特定技术），我将为您进行二次精准筛选。' }
  ]);

  const [expAiChatInput, setExpAiChatInput] = useState('');
  const [expAiChatMessages, setExpAiChatMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: '您好！我是业绩匹配助手。您可以告诉我更具体的业绩要求（如：需要金额超过500万的项目、需要包含特高压关键词的项目），我将为您进行二次精准筛选。' }
  ]);

  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '成员拟定', status: PhaseStatus.NOT_STARTED, progress: 0, icon: Users, color: 'blue' },
    { id: 'exp', name: '业绩遴选', status: PhaseStatus.NOT_STARTED, progress: 0, icon: Award, color: 'emerald' },
    { id: 'content', name: '技术方案编撰', status: PhaseStatus.NOT_STARTED, progress: 0, icon: FileText, color: 'purple' },
  ]);

  useEffect(() => {
    aiChatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChatMessages]);

  useEffect(() => {
    expAiChatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [expAiChatMessages]);

  useEffect(() => {
    teamAiChatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [teamAiChatMessages]);

  useEffect(() => {
    if (currentTask) {
      setTasks(prev => prev.map(t => {
        let status = PhaseStatus.NOT_STARTED;
        let progress = 0;
        
        if (t.id === 'team') {
          status = currentTask.teamStatus || PhaseStatus.NOT_STARTED;
          progress = status === PhaseStatus.COMPLETED || status === PhaseStatus.SUBMITTED ? 100 : (status === PhaseStatus.IN_PROGRESS ? 50 : 0);
        } else if (t.id === 'exp') {
          status = currentTask.expStatus || PhaseStatus.NOT_STARTED;
          progress = status === PhaseStatus.COMPLETED || status === PhaseStatus.SUBMITTED ? 100 : (status === PhaseStatus.IN_PROGRESS ? 50 : 0);
        } else if (t.id === 'content') {
          status = currentTask.contentStatus || PhaseStatus.NOT_STARTED;
          progress = status === PhaseStatus.COMPLETED || status === PhaseStatus.SUBMITTED ? 100 : (status === PhaseStatus.IN_PROGRESS ? 50 : 0);
        }
        
        return { ...t, status, progress };
      }));
    }
  }, [currentTask]);

  // 预览直接跟随 selectedPersonnel 顺序（顺序由用户手动排列或设负责人时自动置顶管理）
  const previewPersonnelList = selectedPersonnel;

  // 业绩总览表组件
  const ProjectSummaryTable: React.FC = () => (
    <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif flex flex-col shrink-0 overflow-hidden p-[20mm]" style={{ width: '297mm', minHeight: 'auto', border: '1px solid #e2e8f0' }}>
      <div className="absolute top-[10mm] right-[15mm] px-3 py-1 border border-slate-400 text-[8pt] text-slate-400 italic font-sans uppercase tracking-widest">Archive Copy - GridBid AI</div>
      <h2 className="text-[14pt] font-bold text-center mb-[8mm] tracking-[3pt]">项目业绩总览表</h2>
      <table className="w-full border-collapse text-[8.5pt]" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '13%' }} />
          <col style={{ width: '16%' }} />
          <col style={{ width: '9%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '14%' }} />
        </colgroup>
        <thead>
          <tr style={{ backgroundColor: '#dbeafe' }}>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold leading-snug">项目法人<br/>（服务对象单位名称）</th>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold">项目名称</th>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold">项目规模</th>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold">服务范围</th>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold leading-snug">服务期间<br/>年·月 至 年·月</th>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold">项目目前进度</th>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold leading-snug">服务人员人数<br/>（高峰/平均）</th>
            <th className="border border-slate-700 px-2 py-2 text-center font-bold leading-snug">建设单位联系人及电话<br/>（服务对象联系信息）</th>
          </tr>
        </thead>
        <tbody>
          {selectedProjects.map((p) => (
            <tr key={p.id} className="align-middle">
              <td className="border border-slate-700 px-2 py-2 text-center align-middle leading-snug">{p.clientName}</td>
              <td className="border border-slate-700 px-2 py-2 align-middle leading-snug">{p.projectName}</td>
              <td className="border border-slate-700 px-2 py-2 text-center align-middle">{p.amount ? `${p.amount}万元` : '—'}</td>
              <td className="border border-slate-700 px-2 py-2 align-middle leading-snug">{p.projectType}</td>
              <td className="border border-slate-700 px-2 py-2 text-center align-middle leading-snug">{p.signingDate} 至 {p.endDate}</td>
              <td className="border border-slate-700 px-2 py-2 text-center align-middle">{p.contractStatus || '—'}</td>
              <td className="border border-slate-700 px-2 py-2 text-center align-middle">{(fullProjectPool.find(fp => fp.id === p.id)?.members || p.members) || '—'}</td>
              <td className="border border-slate-700 px-2 py-2 text-center align-middle leading-snug">{p.contact}{p.phone ? `\n${p.phone}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // 拟委任的主要人员汇总表组件
  const TeamSummaryTable: React.FC = () => {
    // 负责人置首，其余按原顺序
    const leader = selectedPersonnel.find(p => p.id === projectLeaderId);
    const others = selectedPersonnel.filter(p => p.id !== projectLeaderId);
    const ordered = leader ? [leader, ...others] : [...others];
    return (
      <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif flex flex-col shrink-0 overflow-hidden p-[20mm]" style={{ width: '297mm', minHeight: 'auto', border: '1px solid #e2e8f0' }}>
        <div className="absolute top-[10mm] right-[15mm] px-3 py-1 border border-slate-400 text-[8pt] text-slate-400 italic font-sans uppercase tracking-widest">Archive Copy - GridBid AI</div>
        <h2 className="text-[14pt] font-bold text-center mb-[8mm] tracking-[3pt]">拟委任的主要人员汇总表</h2>
        <table className="w-full border-collapse text-[9pt]" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '6%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '6%' }} />
          </colgroup>
          <thead>
            <tr>
              <th rowSpan={2} className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50 align-middle">序号</th>
              <th rowSpan={2} className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50 align-middle">本项目任职</th>
              <th rowSpan={2} className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50 align-middle">姓名</th>
              <th rowSpan={2} className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50 align-middle">职称</th>
              <th rowSpan={2} className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50 align-middle">专业</th>
              <th colSpan={3} className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50">执业或职业资格证明</th>
              <th rowSpan={2} className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50 align-middle">备注</th>
            </tr>
            <tr>
              <th className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50">证书名称</th>
              <th className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50">级别</th>
              <th className="border border-slate-800 px-2 py-2 text-center font-bold bg-slate-50">证号</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              // 预计算每个人的 role 和 certCount
              const rows = ordered.map((p, idx) => ({
                p,
                idx,
                role: p.id === projectLeaderId ? '项目负责人' : (memberProjectRoles[p.id] || '—'),
                certs: p.certs && p.certs.length > 0 ? p.certs : [{ name: '—', level: '—', number: '—' }],
              }));
              // 计算每个人对应的 role 合并信息：isRoleGroupStart + roleRowSpan
              const roleInfo: { isStart: boolean; span: number }[] = rows.map(() => ({ isStart: false, span: 0 }));
              let i = 0;
              while (i < rows.length) {
                const currentRole = rows[i].role;
                let j = i;
                let totalCertRows = 0;
                while (j < rows.length && rows[j].role === currentRole) {
                  totalCertRows += rows[j].certs.length;
                  j++;
                }
                roleInfo[i] = { isStart: true, span: totalCertRows };
                for (let k = i + 1; k < j; k++) roleInfo[k] = { isStart: false, span: 0 };
                i = j;
              }
              return rows.map(({ p, idx, role, certs }, pi) => (
                certs.map((cert, ci) => (
                  <tr key={`${p.id}-${ci}`} className="align-middle">
                    {ci === 0 && <td rowSpan={certs.length} className="border border-slate-800 px-2 py-2 text-center align-middle">{idx + 1}</td>}
                    {ci === 0 && roleInfo[pi].isStart && (
                      <td rowSpan={roleInfo[pi].span} className="border border-slate-800 px-2 py-2 text-center align-middle leading-snug">{role}</td>
                    )}
                    {ci === 0 && <td rowSpan={certs.length} className="border border-slate-800 px-2 py-2 text-center font-bold align-middle">{p.name}</td>}
                    {ci === 0 && <td rowSpan={certs.length} className="border border-slate-800 px-2 py-2 text-center align-middle leading-snug">{p.title}</td>}
                    {ci === 0 && <td rowSpan={certs.length} className="border border-slate-800 px-2 py-2 text-center align-middle leading-snug">{p.major}</td>}
                    <td className="border border-slate-800 px-2 py-2 text-center align-middle leading-snug">{cert.name}</td>
                    <td className="border border-slate-800 px-2 py-2 text-center align-middle">{cert.level}</td>
                    <td className="border border-slate-800 px-2 py-2 text-center align-middle">{cert.number}</td>
                    {ci === 0 && <td rowSpan={certs.length} className="border border-slate-800 px-2 py-2 text-center align-middle"></td>}
                  </tr>
                ))
              ));
            })()}
          </tbody>
        </table>
      </div>
    );
  };

  const moveProject = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= selectedProjects.length) return;
    const next = [...selectedProjects];
    [next[idx], next[target]] = [next[target], next[idx]];
    setSelectedProjects(next);
  };

  const moveMember = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= selectedPersonnel.length) return;
    const next = [...selectedPersonnel];
    [next[idx], next[target]] = [next[target], next[idx]];
    setSelectedPersonnel(next);
  };

  const handleSetLeader = (personId: string) => {
    const isLeader = projectLeaderId === personId;
    if (isLeader) {
      setProjectLeaderId(null);
    } else {
      setProjectLeaderId(personId);
      // 将负责人移到第一位
      setSelectedPersonnel(prev => {
        const idx = prev.findIndex(p => p.id === personId);
        if (idx <= 0) return prev;
        const next = [...prev];
        const [leader] = next.splice(idx, 1);
        return [leader, ...next];
      });
    }
  };

  const markTaskCompleted = (taskId: 'team' | 'exp' | 'content') => {
    if (taskId === 'team' && selectedPersonnel.length > 0 && !projectLeaderId) {
      alert("请在已选团队池中指定一名“项目负责人”，这将决定标书资历文件的排版顺序。");
      return;
    }
    if (!currentTask || !onUpdateTask) return;

    setPhase('hub');
    setActiveTaskId(null);

    const updatedTask = { 
      ...currentTask,
      lastModifiedBy: currentUser?.name || '未知用户',
      lastModifiedTime: new Date().toLocaleString()
    };
    
    if (taskId === 'team') {
      updatedTask.teamStatus = PhaseStatus.COMPLETED;
      updatedTask.isTeamDone = true;
    }
    if (taskId === 'exp') {
      updatedTask.expStatus = PhaseStatus.COMPLETED;
      updatedTask.isExpDone = true;
    }
    if (taskId === 'content') {
      updatedTask.contentStatus = PhaseStatus.COMPLETED;
      updatedTask.isContentDone = true;
    }

    const doneCount = [
      updatedTask.teamStatus === PhaseStatus.COMPLETED || updatedTask.teamStatus === PhaseStatus.SUBMITTED,
      updatedTask.expStatus === PhaseStatus.COMPLETED || updatedTask.expStatus === PhaseStatus.SUBMITTED,
      updatedTask.contentStatus === PhaseStatus.COMPLETED || updatedTask.contentStatus === PhaseStatus.SUBMITTED
    ].filter(Boolean).length;
    
    updatedTask.progress = Math.round((doneCount / 3) * 100);
    onUpdateTask(updatedTask);
  };

  const handleTeamAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setAiRecommendations([
        { person: fullPersonnelPool[1], reason: '具备18年特高压研发背景，匹配本项目高级架构师要求。', matchScore: 99 },
        { person: fullPersonnelPool[0], reason: '南网科技成果转化经验丰富，适合做咨询支撑。', matchScore: 92 }
      ]);
      setIsAiRecommending(false);
    }, 1000);
  };

  const handleExpAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setExpAiRecommendations([
        { project: fullProjectPool[1], reason: '数字化 EPC 业绩与本次招标 220kV 改造需求完美契合。', matchScore: 98 },
        { project: fullProjectPool[2], reason: '无人机 AI 算法案例可支撑技术响应章节中的“智能巡检”要求。', matchScore: 89 }
      ]);
      setIsAiRecommending(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;
    setReferenceFiles(prev => [...prev, ...files.map(f => ({ id: Math.random().toString(), name: f.name, size: '2MB', type: 'PDF', uploadTime: new Date().toLocaleTimeString() }))]);
    setIsFilesProcessing(true);
    setTimeout(() => {
      setIsFilesProcessing(false);
      setAiChatMessages(prev => [...prev, { role: 'assistant', text: `已成功接收并消化了参考资料。我将结合这些资料对方案内容进行对齐。` }]);
    }, 1500);
  };

  const handleAiChatSend = () => {
    if (!aiChatInput.trim()) return;
    const newMsgs = [...aiChatMessages, { role: 'user', text: aiChatInput } as const];
    setAiChatMessages(newMsgs);
    setAiChatInput('');
    setIsAiRecommending(true);
    setTimeout(() => {
      setAiChatMessages([...newMsgs, { role: 'assistant', text: '已根据要求及参考资料优化了技术方案。' }]);
      setIsAiRecommending(false);
    }, 800);
  };

  const handleTeamAiChatSend = () => {
    if (!teamAiChatInput.trim()) return;
    const newMsgs = [...teamAiChatMessages, { role: 'user', text: teamAiChatInput } as const];
    setTeamAiChatMessages(newMsgs);
    setTeamAiChatInput('');
    setIsAiRecommending(true);
    setTimeout(() => {
      setTeamAiChatMessages([...newMsgs, { role: 'assistant', text: '收到您的要求。正在重新分析专家库... 已根据您的指令（' + teamAiChatInput + '）完成了二次筛选，推荐列表已更新。' }]);
      // 模拟二次筛选结果
      setAiRecommendations([
        { person: fullPersonnelPool[2], reason: '根据您的二次指令，该专家在相关领域有更深厚的技术沉淀。', matchScore: 96 },
        { person: fullPersonnelPool[1], reason: '符合您提到的特定经验要求。', matchScore: 94 }
      ]);
      setIsAiRecommending(false);
    }, 1000);
  };

  const handleExpAiChatSend = () => {
    if (!expAiChatInput.trim()) return;
    const newMsgs = [...expAiChatMessages, { role: 'user', text: expAiChatInput } as const];
    setExpAiChatMessages(newMsgs);
    setExpAiChatInput('');
    setIsAiRecommending(true);
    setTimeout(() => {
      setExpAiChatMessages([...newMsgs, { role: 'assistant', text: '收到您的要求。正在重新分析业绩库... 已根据您的指令（' + expAiChatInput + '）完成了二次筛选，推荐列表已更新。' }]);
      // 模拟二次筛选结果
      setExpAiRecommendations([
        { project: fullProjectPool[0], reason: '根据您的二次指令，该项目在相关领域有更匹配的实施细节。', matchScore: 95 },
        { project: fullProjectPool[2], reason: '符合您提到的特定业绩规模或技术要求。', matchScore: 92 }
      ]);
      setIsAiRecommending(false);
    }, 1000);
  };

  // Fix: Use React.FC to allow 'key' prop in JSX when rendering lists
  const PersonnelCard: React.FC<{
    person: Personnel;
    isRecommended?: boolean;
    reason?: string;
    score?: number;
  }> = ({ person, isRecommended = false, reason = '', score = 0 }) => (
    <div className={`p-6 rounded-[32px] border-2 transition-all relative overflow-hidden group animate-in slide-in-from-left text-left ${isRecommended ? 'bg-indigo-50/20 border-indigo-100 shadow-sm' : 'bg-white border-slate-100 hover:border-indigo-300'}`}>
      {isRecommended && <div className="absolute top-0 right-0 px-6 py-1.5 bg-indigo-600 text-white text-[9px] font-black italic tracking-widest shadow-lg">匹配 {score}%</div>}
      <div className="flex items-start space-x-5 mb-5 text-left">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-lg">{person.name[0]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h5 className="text-lg font-black text-slate-900 truncate italic">{person.name}</h5>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase">{person.age}岁</span>
          </div>
          <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-tighter truncate">{person.title} · {person.education}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/50 p-2.5 rounded-2xl border border-slate-100">
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">总工龄 / 同类项目</p>
           <p className="text-xs font-black text-slate-800">{person.years}年 / <span className="text-emerald-600">{person.similarYears}年</span></p>
        </div>
        <div className="bg-white/50 p-2.5 rounded-2xl border border-slate-100">
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">当前任务负载</p>
           <div className="flex items-center space-x-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner"><div className={`h-full ${person.currentLoad > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${person.currentLoad * 100}%` }}></div></div>
              <span className="text-[10px] font-black text-slate-600">{(person.currentLoad * 100).toFixed(0)}%</span>
           </div>
        </div>
      </div>
      {reason && <p className="text-[10px] text-slate-500 font-bold mb-5 italic border-l-2 border-indigo-200 pl-3 leading-relaxed">判定：{reason}</p>}
      <div className="flex space-x-2">
        <button onClick={() => setDetailPerson(person)} className="flex-1 py-3 bg-white text-slate-500 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-center"><Eye size={12} className="mr-1.5" /> 资历全案</button>
        {canEditTeam && <button onClick={() => setSelectedPersonnel(prev => prev.find(p => p.id === person.id) ? prev : [...prev, person])} className="flex-[1.5] py-3 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all">指派</button>}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen space-y-6 text-left">
      {/* 深度详情模态框 (A4仿真) */}
      {detailPerson && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center py-12 overflow-y-auto animate-in fade-in duration-500 custom-scrollbar-main text-left">
           <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[20] flex items-center space-x-4 bg-slate-900/80 p-2 rounded-2xl border border-white/10 backdrop-blur shadow-2xl">
              <div className="px-6 border-r border-white/10 text-white font-black text-[10px] uppercase tracking-widest italic flex items-center"><ShieldCheck size={16} className="text-indigo-400 mr-2" /> 专家详细资历档案</div>
              <button onClick={() => setDetailPerson(null)} className="flex items-center px-8 py-2.5 bg-slate-100 text-slate-900 hover:bg-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">关闭预览</button>
           </div>
           <div className="mt-16 flex flex-col items-center"><PersonnelFullDocumentMerged person={detailPerson} isLeader={detailPerson.id === projectLeaderId} /></div>
        </div>
      )}
      {detailProject && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center py-12 overflow-y-auto animate-in fade-in duration-500 custom-scrollbar-main text-left">
           <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[20] flex items-center space-x-4 bg-slate-900/80 p-2 rounded-2xl border border-white/10 backdrop-blur shadow-2xl">
              <div className="px-6 border-r border-white/10 text-white font-black text-[10px] uppercase tracking-widest italic flex items-center"><ShieldCheck size={16} className="text-emerald-400 mr-2" /> 项目业绩深度详情</div>
              <button onClick={() => setDetailProject(null)} className="flex items-center px-8 py-2.5 bg-slate-100 text-slate-900 hover:bg-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">关闭阅览</button>
           </div>
           <div className="mt-16 flex flex-col items-center"><ProjectFullDocumentMerged project={detailProject} /></div>
        </div>
      )}

      <header className="bg-white px-10 py-6 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-8 text-left min-w-0 flex-1">
          <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-lg shrink-0"><Layers size={26} /></div>
          <div className="min-w-0">
            <div className="flex items-center space-x-4 min-w-0">
               <h2 className="text-xl font-black text-slate-900 truncate tracking-tight leading-none uppercase italic" title={currentTask?.title}>
                 {currentTask?.title || "未选择投标项目"}
               </h2>
               {currentTask?.lotName && (
                 <>
                   <ChevronRight size={20} className="text-slate-300 shrink-0" />
                   <h2 className="text-xl font-bold text-blue-600 truncate italic tracking-tighter leading-none shrink-0">
                     {currentTask.lotName}
                   </h2>
                 </>
               )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6 shrink-0 ml-10">
           {phase !== 'hub' && (
             <div className="flex items-center px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest italic bg-emerald-50 text-emerald-600 border-emerald-100">
                <UnlockKeyhole size={14} className="mr-2"/> 全员协作模式
             </div>
           )}
           {phase !== 'hub' && <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 px-4 py-2 uppercase tracking-widest transition-colors"><ChevronLeft size={18} className="mr-2" /> 返回枢纽</button>}
           {onBack && <button onClick={onBack} className="text-xs font-black text-slate-400 flex items-center hover:text-slate-900 px-4 py-2 border border-slate-200 rounded-xl uppercase tracking-widest transition-all hover:border-slate-400"><ChevronLeft size={18} className="mr-2" /> 投标计划</button>}
        </div>
      </header>

      <main className="flex-1 flex relative">
        {phase === 'hub' && (
          <div className="flex-1 p-10 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
             {tasks.map(task => {
               const isSubmitted = task.status === PhaseStatus.SUBMITTED;
               const isCompleted = task.status === PhaseStatus.COMPLETED;
               
               return (
                <div key={task.id} className={`relative min-h-[420px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group bg-white ${isSubmitted || isCompleted ? 'border-emerald-100 shadow-xl' : 'border-slate-50 shadow-sm'}`}>
                    <div className={`p-8 rounded-[40px] mb-8 transition-transform group-hover:scale-110 shadow-lg ${isSubmitted || isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}><task.icon size={48} /></div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                    <div className="mt-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      {task.status}
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-8 shadow-inner"><div className={`h-full transition-all duration-1000 ${isSubmitted || isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div></div>
                    <button 
                      onClick={() => { 
                        if (isSubmitted) return;
                        setActiveTaskId(task.id); 
                        setPhase('task'); 
                        // 进入阶段即设为进行中
                        if (task.status === PhaseStatus.NOT_STARTED && currentTask && onUpdateTask) {
                          const updated = { ...currentTask };
                          if (task.id === 'team') updated.teamStatus = PhaseStatus.IN_PROGRESS;
                          if (task.id === 'exp') updated.expStatus = PhaseStatus.IN_PROGRESS;
                          if (task.id === 'content') updated.contentStatus = PhaseStatus.IN_PROGRESS;
                          onUpdateTask(updated);
                        }
                      }} 
                      disabled={isSubmitted}
                      className={`px-12 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isSubmitted ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-black'}`}
                    >
                      {isSubmitted ? '已提交锁定' : (isCompleted ? '重新校阅' : '立即进入')}
                    </button>
                    <div className="mt-6 flex flex-col items-center space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest">全员协作模式</p>
                      {currentTask?.lastModifiedBy && (
                        <p className="text-[8px] text-slate-300 font-bold uppercase">
                          最后修改: {currentTask.lastModifiedBy} @ {currentTask.lastModifiedTime}
                        </p>
                      )}
                    </div>
                    {(isSubmitted || isCompleted) && <div className="absolute top-10 right-10 text-emerald-500 animate-in zoom-in duration-500"><BadgeCheck size={40} /></div>}
                </div>
               );
             })}
            </div>
          </div>
        )}

        {/* 成员拟定环节 */}
        {phase === 'task' && activeTaskId === 'team' && (
          <div className="w-full flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-left">
                <div className="flex items-center space-x-6 text-left">
                   <div className="w-14 h-14 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-indigo-600 shadow-indigo-100"><Users size={28}/></div>
                   <div><h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">拟定项目实施团队成员名单</h3></div>
                </div>
                <div className="flex space-x-4"><button onClick={() => {
                  if (selectedPersonnel.length === 0) { alert('请先指派至少一名团队成员。'); return; }
                  const missing = selectedPersonnel.filter(p => p.id !== projectLeaderId && !memberProjectRoles[p.id]);
                  if (missing.length > 0) { alert(`以下成员尚未指定"本项目任职"，请全部指定后再生成预览：\n${missing.map(p => p.name).join('、')}`); return; }
                  setPhase('team_preview');
                }} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200 shadow-sm">项目团队预览</button>{canEditTeam && (<button onClick={() => markTaskCompleted('team')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl"><CheckCircle2 size={18} className="mr-3 inline" /> 确认并锁定环节</button>)}</div>
             </div>
              <div className="flex bg-white text-left relative w-full overflow-hidden">
                <div className="flex-1 flex flex-col border-r border-slate-100 p-10 space-y-10 min-w-0 w-0 overflow-hidden">
                   <section className="text-left">
                      <div className="flex items-center justify-between mb-8 text-left">
                         <div className="flex items-center italic text-left"><Bot size={28} className="text-indigo-600 mr-3" /><h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">GridGPT 专家智能推荐轨道</h4></div>
                         <button disabled={isAiRecommending || !canEditTeam} onClick={handleTeamAiRecommend} className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl disabled:opacity-30 transition-all">{isAiRecommending ? <RefreshCw className="mr-2 animate-spin" size={14}/> : <BrainCircuit size={14} className="mr-2" />} 启动画像匹配</button>
                      </div>
                      <div className="w-full overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm custom-scrollbar-main">
                        <table className="w-full min-w-[1910px] text-left border-collapse table-fixed">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[120px] whitespace-nowrap sticky left-0 bg-slate-50 z-20">匹配度</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[150px] whitespace-nowrap sticky left-[120px] bg-slate-50 z-20 text-center">操作</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[150px] whitespace-nowrap sticky left-[270px] bg-slate-50 z-20">姓名</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[200px] whitespace-nowrap">职称</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[250px] whitespace-nowrap">学历/专业</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 text-center w-[100px] whitespace-nowrap">工龄</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 text-center w-[100px] whitespace-nowrap">同类年限</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[220px] whitespace-nowrap">拟任岗位</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 text-center w-[120px] whitespace-nowrap">当前负荷</th>
                              <th className="px-6 py-6 text-left w-[500px] whitespace-nowrap">AI 画像判定</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {aiRecommendations.map((rec, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-6 border-r border-slate-100/60 whitespace-nowrap overflow-hidden sticky left-0 bg-white group-hover:bg-slate-50 z-10">
                                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black rounded italic">
                                    {rec.matchScore}%
                                  </span>
                                </td>
                                <td className="px-4 py-4 border-r border-slate-100/60 sticky left-[120px] bg-white group-hover:bg-slate-50 z-10">
                                  <div className="flex items-center justify-center space-x-2">
                                    <button onClick={() => setDetailPerson(rec.person)} className="p-2 text-slate-400 hover:text-indigo-600 transition-all bg-white rounded-lg border border-slate-200 shadow-sm" title="查看资历">
                                      <Eye size={14} />
                                    </button>
                                    {canEditTeam && (
                                      <button 
                                        onClick={() => setSelectedPersonnel(prev => prev.find(p => p.id === rec.person.id) ? prev : [...prev, rec.person])} 
                                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-sm active:scale-95"
                                      >
                                        选用
                                      </button>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-6 text-sm font-bold text-slate-900 border-r border-slate-100/60 whitespace-nowrap overflow-hidden sticky left-[270px] bg-white group-hover:bg-slate-50 z-10">
                                  {rec.person.name}
                                </td>
                                <td className="px-6 py-6 text-[11px] font-medium text-slate-500 uppercase border-r border-slate-100/60 whitespace-nowrap overflow-hidden">
                                  {rec.person.title}
                                </td>
                                <td className="px-6 py-6 text-[11px] font-medium text-slate-400 border-r border-slate-100/60 whitespace-nowrap overflow-hidden">
                                  {rec.person.education} · {rec.person.major}
                                </td>
                                <td className="px-6 py-6 text-sm font-medium text-slate-600 border-r border-slate-100/60 text-center whitespace-nowrap overflow-hidden">
                                  {rec.person.years}年
                                </td>
                                <td className="px-6 py-6 text-sm font-bold text-indigo-600 border-r border-slate-100/60 text-center whitespace-nowrap overflow-hidden">
                                  {rec.person.similarYears}年
                                </td>
                                <td className="px-6 py-6 text-[11px] font-bold text-indigo-600 uppercase border-r border-slate-100/60 whitespace-nowrap overflow-hidden">
                                  {rec.person.proposedPosition}
                                </td>
                                <td className="px-6 py-6 border-r border-slate-100/60 text-center whitespace-nowrap overflow-hidden">
                                  <div className="flex items-center justify-center space-x-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${rec.person.currentLoad > 80 ? 'bg-red-500' : rec.person.currentLoad > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                    <span className="text-[11px] font-bold text-slate-500">{rec.person.currentLoad}%</span>
                                  </div>
                                </td>
                                <td className="px-6 py-6 text-[11px] text-slate-500 font-medium whitespace-nowrap overflow-hidden">
                                  <div className="leading-relaxed italic">{rec.reason}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </section>
                   <div className="h-px bg-slate-100 w-full"></div>
                   <section className="text-left pb-12">
                      <div className="flex items-center justify-between mb-8 text-left">
                         <div className="flex items-center italic text-left"><SearchCode size={28} className="text-slate-400 mr-3" /><h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">全库专家人工检索轨道</h4></div>
                         <div className="relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} /><input disabled={!canEditTeam} value={personnelSearch} onChange={e => { setPersonnelSearch(e.target.value); setPersonnelPage(1); }} placeholder="检索姓名/院校/岗位..." className="pl-12 pr-6 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl outline-none text-sm font-bold text-slate-700 w-80 focus:bg-white focus:border-indigo-500 transition-all shadow-inner" /></div>
                      </div>
                      <div className="w-full overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm custom-scrollbar-main">
                        <table className="w-full min-w-[1290px] text-left border-collapse table-fixed">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[150px] whitespace-nowrap sticky left-0 bg-slate-50 z-20 text-center">操作</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[150px] whitespace-nowrap sticky left-[150px] bg-slate-50 z-20">姓名</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[200px] whitespace-nowrap sticky left-[300px] bg-slate-50 z-20">职称</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[250px] whitespace-nowrap">学历/专业</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 text-center w-[100px] whitespace-nowrap">工龄</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 text-center w-[100px] whitespace-nowrap">同类年限</th>
                              <th className="px-6 py-6 border-r border-slate-200/60 w-[220px] whitespace-nowrap">拟任岗位</th>
                              <th className="px-6 py-6 text-center w-[120px] whitespace-nowrap">当前负荷</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {(() => {
                              const filtered = fullPersonnelPool.filter(p =>
                                p.name.includes(personnelSearch) ||
                                p.title.includes(personnelSearch) ||
                                p.proposedPosition.includes(personnelSearch) ||
                                p.school.includes(personnelSearch)
                              );
                              const totalPages = Math.ceil(filtered.length / PERSONNEL_PAGE_SIZE);
                              const paged = filtered.slice((personnelPage - 1) * PERSONNEL_PAGE_SIZE, personnelPage * PERSONNEL_PAGE_SIZE);
                              return paged.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                                  <td className="px-4 py-4 border-r border-slate-100/60 sticky left-0 bg-white group-hover:bg-slate-50 z-10">
                                    <div className="flex items-center justify-center space-x-2">
                                      <button onClick={() => setDetailPerson(p)} className="p-2 text-slate-400 hover:text-indigo-600 transition-all bg-white rounded-lg border border-slate-200 shadow-sm" title="查看资历">
                                        <Eye size={14} />
                                      </button>
                                      {canEditTeam && (
                                        <button
                                          onClick={() => setSelectedPersonnel(prev => prev.find(i => i.id === p.id) ? prev : [...prev, p])}
                                          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-sm active:scale-95"
                                        >
                                          选用
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-6 text-sm font-bold text-slate-900 border-r border-slate-100/60 whitespace-nowrap overflow-hidden sticky left-[150px] bg-white group-hover:bg-slate-50 z-10">
                                    {p.name}
                                  </td>
                                  <td className="px-6 py-6 text-[11px] font-medium text-slate-500 uppercase border-r border-slate-100/60 whitespace-nowrap overflow-hidden sticky left-[300px] bg-white group-hover:bg-slate-50 z-10">
                                    {p.title}
                                  </td>
                                  <td className="px-6 py-6 text-[11px] font-medium text-slate-400 border-r border-slate-100/60 whitespace-nowrap overflow-hidden">
                                    {p.education} · {p.major}
                                  </td>
                                  <td className="px-6 py-6 text-sm font-medium text-slate-600 border-r border-slate-100/60 text-center whitespace-nowrap overflow-hidden">
                                    {p.years}年
                                  </td>
                                  <td className="px-6 py-6 text-sm font-bold text-indigo-600 border-r border-slate-100/60 text-center whitespace-nowrap overflow-hidden">
                                    {p.similarYears}年
                                  </td>
                                  <td className="px-6 py-6 text-[11px] font-bold text-indigo-600 uppercase border-r border-slate-100/60 whitespace-nowrap overflow-hidden">
                                    {p.proposedPosition}
                                  </td>
                                  <td className="px-6 py-6 text-center whitespace-nowrap overflow-hidden">
                                    <div className="flex items-center justify-center space-x-2">
                                      <div className={`w-1.5 h-1.5 rounded-full ${p.currentLoad > 0.8 ? 'bg-red-500' : p.currentLoad > 0.5 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                      <span className="text-[11px] font-bold text-slate-500">{(p.currentLoad * 100).toFixed(0)}%</span>
                                    </div>
                                  </td>
                                </tr>
                              ));
                            })()}
                          </tbody>
                        </table>
                      </div>
                      {/* 分页控件 */}
                      {(() => {
                        const filtered = fullPersonnelPool.filter(p =>
                          p.name.includes(personnelSearch) ||
                          p.title.includes(personnelSearch) ||
                          p.proposedPosition.includes(personnelSearch) ||
                          p.school.includes(personnelSearch)
                        );
                        const totalPages = Math.ceil(filtered.length / PERSONNEL_PAGE_SIZE);
                        if (totalPages <= 1) return null;
                        return (
                          <div className="flex items-center justify-between mt-4 px-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              共 {filtered.length} 人 · 第 {personnelPage} / {totalPages} 页
                            </span>
                            <div className="flex items-center space-x-1">
                              <button
                                disabled={personnelPage === 1}
                                onClick={() => setPersonnelPage(p => p - 1)}
                                className="w-8 h-8 rounded-xl border border-slate-200 text-slate-500 text-xs font-black hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 transition-all"
                              >‹</button>
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                                <button
                                  key={pg}
                                  onClick={() => setPersonnelPage(pg)}
                                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${personnelPage === pg ? 'bg-indigo-600 text-white shadow-md' : 'border border-slate-200 text-slate-500 hover:border-indigo-500 hover:text-indigo-600'}`}
                                >{pg}</button>
                              ))}
                              <button
                                disabled={personnelPage === totalPages}
                                onClick={() => setPersonnelPage(p => p + 1)}
                                className="w-8 h-8 rounded-xl border border-slate-200 text-slate-500 text-xs font-black hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 transition-all"
                              >›</button>
                            </div>
                          </div>
                        );
                      })()}
                   </section>
                </div>
                <div className={`${isSidebarCollapsed ? 'w-0' : 'w-[400px]'} transition-all duration-300 flex flex-col shrink-0 bg-slate-50 border-l border-slate-200 relative`}>
                  <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -left-4 top-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md z-20 hover:bg-slate-50 transition-colors"
                  >
                    {isSidebarCollapsed ? <ChevronLeft size={16} className="text-slate-600" /> : <ChevronRight size={16} className="text-slate-600" />}
                  </button>
                  
                  {!isSidebarCollapsed && (
                    <div className="p-6 gap-6 flex flex-col animate-in fade-in duration-500">
                      {/* 构件 1: 标书拟定团队池 */}
                      <div className="bg-slate-950 rounded-[32px] shadow-2xl flex flex-col border border-white/5 overflow-hidden">
                    <div className="flex flex-col p-6 text-left">
                      <div className="flex items-center justify-between mb-6 text-white italic text-left">
                          <div className="flex items-center italic">
                            <UserPlus2 size={20} className="text-indigo-400 mr-3" />
                            <h4 className="text-sm font-black uppercase tracking-tighter">标书拟定团队池</h4>
                          </div>
                          <span className="text-slate-500 text-[10px] font-black italic tracking-widest">{selectedPersonnel.length} 人</span>
                      </div>
                      <div className={`space-y-3 pr-2 text-left ${selectedPersonnel.length >= 8 ? 'overflow-y-auto max-h-[480px] custom-scrollbar-dark' : ''}`}>
                          {selectedPersonnel.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 opacity-50">
                              <Users size={40} strokeWidth={1} />
                              <p className="text-[10px] font-bold uppercase tracking-widest">暂未指派团队成员</p>
                            </div>
                          ) : (
                            selectedPersonnel.map((p, idx) => {
                              const isLeader = p.id === projectLeaderId;
                              return (
                                <div key={p.id} className={`p-4 border transition-all rounded-[24px] flex items-center justify-between group text-white text-left animate-in slide-in-from-bottom-4 ${isLeader ? 'bg-indigo-600/20 border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'bg-white/5 border-white/5'}`}>
                                    <div className="flex items-center space-x-3 min-w-0 flex-1 text-left">
                                      {/* 排序箭头 */}
                                      {canEditTeam && (
                                        <div className="flex flex-col space-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                          <button onClick={() => moveMember(idx, -1)} disabled={idx === 0} className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20 transition-colors rounded"><ArrowUp size={12} /></button>
                                          <button onClick={() => moveMember(idx, 1)} disabled={idx === selectedPersonnel.length - 1} className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20 transition-colors rounded"><ArrowDown size={12} /></button>
                                        </div>
                                      )}
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg transition-colors ${isLeader ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/20' : 'bg-slate-800 text-slate-400'}`}>
                                        {isLeader ? <Medal size={18} /> : idx + 1}
                                      </div>
                                      <div className="text-left min-w-0 flex-1">
                                          <div className="flex items-center space-x-2">
                                            <p className="text-sm font-black italic truncate">{p.name}</p>
                                            {isLeader && <span className="px-1.5 py-0.5 bg-indigo-600 text-[8px] font-black uppercase rounded italic tracking-widest">负责人</span>}
                                          </div>
                                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 italic truncate tracking-tight">{p.proposedPosition}</p>
                                          {/* 本项目任职选择 */}
                                          {canEditTeam && (
                                            <div className="mt-2">
                                              {addingRoleForId === p.id ? (
                                                <div className="flex items-center space-x-1" onClick={e => e.stopPropagation()}>
                                                  <input
                                                    autoFocus
                                                    value={newRoleTypeInput}
                                                    onChange={e => setNewRoleTypeInput(e.target.value)}
                                                    onKeyDown={e => {
                                                      if (e.key === 'Enter' && newRoleTypeInput.trim()) {
                                                        const t = newRoleTypeInput.trim();
                                                        if (!projectRoleTypes.includes(t)) setProjectRoleTypes(prev => [...prev, t]);
                                                        setMemberProjectRoles(prev => ({ ...prev, [p.id]: t }));
                                                        setNewRoleTypeInput('');
                                                        setAddingRoleForId(null);
                                                      } else if (e.key === 'Escape') {
                                                        setNewRoleTypeInput('');
                                                        setAddingRoleForId(null);
                                                      }
                                                    }}
                                                    placeholder="输入新类型后回车"
                                                    className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-[9px] text-white font-bold outline-none focus:border-indigo-400 min-w-0"
                                                  />
                                                  <button onClick={() => { setNewRoleTypeInput(''); setAddingRoleForId(null); }} className="text-slate-500 hover:text-white"><X size={10}/></button>
                                                </div>
                                              ) : (
                                                <div className="flex items-center space-x-1 flex-wrap gap-y-1">
                                                  <select
                                                    value={memberProjectRoles[p.id] || ''}
                                                    onChange={e => {
                                                      if (e.target.value === '__add__') {
                                                        setAddingRoleForId(p.id);
                                                      } else {
                                                        setMemberProjectRoles(prev => ({ ...prev, [p.id]: e.target.value }));
                                                      }
                                                    }}
                                                    className="flex-1 min-w-0 px-2 py-1 bg-white/10 border border-white/10 rounded-lg text-[9px] text-white font-bold outline-none focus:border-indigo-400 cursor-pointer appearance-none"
                                                    style={{ maxWidth: '100%' }}
                                                  >
                                                    <option value="" disabled className="bg-slate-900 text-slate-400">本项目任职…</option>
                                                    {projectRoleTypes.map(rt => (
                                                      <option key={rt} value={rt} className="bg-slate-900 text-white">{rt}</option>
                                                    ))}
                                                    <option value="__add__" className="bg-slate-900 text-indigo-400">＋ 添加新类型</option>
                                                  </select>
                                                  {memberProjectRoles[p.id] && (
                                                    <button onClick={() => setMemberProjectRoles(prev => { const n = {...prev}; delete n[p.id]; return n; })} className="text-slate-600 hover:text-red-400 transition-colors"><X size={9}/></button>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                          {!canEditTeam && memberProjectRoles[p.id] && (
                                            <span className="inline-block mt-1.5 px-2 py-0.5 bg-white/10 text-[8px] font-black text-slate-300 rounded uppercase tracking-widest">{memberProjectRoles[p.id]}</span>
                                          )}
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      {canEditTeam && (
                                        <button
                                          onClick={() => handleSetLeader(p.id)}
                                          className={`p-2 rounded-lg transition-all ${isLeader ? 'text-blue-400 bg-blue-400/10' : 'text-slate-500 hover:text-blue-400 hover:bg-white/5'}`}
                                          title={isLeader ? "取消负责人身份" : "设为负责人并置顶"}
                                        >
                                          <Star size={14} fill={isLeader ? "currentColor" : "none"} />
                                        </button>
                                      )}
                                      <button onClick={() => setDetailPerson(p)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"><Maximize2 size={14}/></button>
                                      {canEditTeam && <button onClick={() => { setSelectedPersonnel(selectedPersonnel.filter((_, i) => i !== idx)); if(isLeader) setProjectLeaderId(null); }} className="p-2 text-slate-600 hover:text-red-400 transition-all rounded-lg hover:bg-white/5"><Trash2 size={16} /></button>}
                                    </div>
                                </div>
                              );
                            })
                          )}
                      </div>
                    </div>
                  </div>

                  {/* 构件 2: 团队筛选助理 */}
                  <div className="bg-slate-950 rounded-[32px] shadow-2xl flex flex-col border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent pointer-events-none" />
                    <div className="px-6 py-4 bg-slate-800/30 backdrop-blur-xl flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                          <Bot size={16} className="text-indigo-400"/>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-white italic">GridGPT 团队筛选助理</h4>
                          <p className="text-[8px] text-indigo-400/60 font-bold uppercase tracking-tighter">AI-Powered Selection Engine</p>
                        </div>
                      </div>
                      {isAiRecommending && <div className="flex items-center space-x-1 animate-pulse"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span></div>}
                    </div>
                    <div className="p-6 space-y-6 relative z-10 overflow-y-auto max-h-72 custom-scrollbar-dark">
                      {teamAiChatMessages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-6">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Sparkles size={20} className="text-indigo-400 opacity-50" />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                            您可以输入具体的要求来进一步筛选专家，例如：<br/>
                            <span className="text-indigo-400/70">“需要具有500kV变电站设计经验的人选”</span>
                          </p>
                        </div>
                      ) : (
                        teamAiChatMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                            <div className={`max-w-[90%] p-4 rounded-2xl text-[10px] leading-relaxed shadow-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none font-bold' : 'bg-slate-800/80 text-slate-300 border border-white/10 rounded-tl-none italic font-medium'}`}>
                              {msg.text}
                            </div>
                          </div>
                        ))
                      )}
                      {isAiRecommending && (
                        <div className="flex justify-start animate-in fade-in">
                          <div className="bg-slate-800/80 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center space-x-3">
                            <RefreshCw size={14} className="text-indigo-400 animate-spin" />
                            <span className="text-[10px] text-indigo-400 font-black uppercase italic tracking-widest">正在深度分析...</span>
                          </div>
                        </div>
                      )}
                      <div ref={teamAiChatBottomRef} />
                    </div>
                    <div className="p-6 bg-slate-950/80 border-t border-white/10 relative z-10">
                      <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-indigo-500/50 focus-within:bg-white/10 transition-all shadow-inner">
                        <input 
                          value={teamAiChatInput} 
                          onChange={e => setTeamAiChatInput(e.target.value)} 
                          onKeyDown={e => e.key === 'Enter' && handleTeamAiChatSend()}
                          placeholder="输入筛选指令..." 
                          className="flex-1 bg-transparent border-none outline-none text-white text-[10px] px-3 font-medium placeholder:text-slate-700" 
                        />
                        <button onClick={handleTeamAiChatSend} className="bg-indigo-600 p-3 text-white rounded-xl hover:bg-indigo-500 shadow-lg active:scale-90 transition-all flex items-center justify-center">
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                    </div>
                  )}
                </div>
              </div>
          </div>
        )}

        {/* 业绩遴选环节 */}
        {phase === 'task' && activeTaskId === 'exp' && (
          <div className="w-full flex flex-col bg-white rounded-[48px] border border-slate-200 shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-left">
                <div className="flex items-center space-x-6 text-left">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-emerald-600 shadow-emerald-100"><Award size={24}/></div>
                   <div><h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">支撑项目业绩池遴选</h3></div>
                </div>
                <div className="flex space-x-4"><button onClick={() => { if (selectedProjects.length === 0) { alert('请先遴选至少一条业绩后再生成预览。'); return; } setPhase('exp_preview'); }} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all border border-slate-200 shadow-sm flex items-center"><History size={16} className="mr-2" /> 业绩全案预览 (仿真)</button>{canEditExp && (<button onClick={() => markTaskCompleted('exp')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl active:scale-95"><CheckCircle2 size={18} className="mr-3 inline" /> 锁定所选业绩</button>)}</div>
             </div>
              <div className="flex bg-white text-left relative w-full overflow-hidden">
                <div className="flex-1 flex flex-col border-r border-slate-100 p-8 space-y-10 min-w-0 w-0 overflow-hidden bg-slate-50/20">
                   <section className="text-left">
                      <div className="flex items-center justify-between mb-6 text-left"><div className="flex items-center italic text-left"><Bot size={24} className="text-emerald-600 mr-3" /><h4 className="text-xs font-black text-slate-900 uppercase">智能业绩推荐</h4></div><button disabled={isAiRecommending || !canEditExp} onClick={handleExpAiRecommend} className="flex items-center px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl disabled:opacity-30 transition-all">{isAiRecommending ? <RefreshCw className="mr-2 animate-spin" size={12}/> : <BrainCircuit size={12} className="mr-2" />} 启动智能匹配</button></div>
                      <div className="w-full overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm custom-scrollbar-main">
                        <table className="w-full min-w-[1400px] text-left border-separate border-spacing-0">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                              <th className="sticky left-0 z-20 bg-slate-50 w-20 px-6 py-6 border-r border-b border-slate-200/60">匹配度</th>
                              <th className="sticky left-20 z-20 bg-slate-50 w-36 px-6 py-6 border-r border-b border-slate-200/60 text-center">操作</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">年份</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">类型</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">业绩名称</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">建设单位</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">地点</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60 text-center">金额(W)</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">项目负责人</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">签订日期</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">合同状态</th>
                              <th className="px-6 py-6 border-b border-slate-200/60">AI 判定理由</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {expAiRecommendations.map((rec, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                <td className="sticky left-0 z-10 bg-white px-4 py-4 border-r border-slate-100/60">
                                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black rounded italic">
                                    {rec.matchScore}%
                                  </span>
                                </td>
                                <td className="sticky left-20 z-10 bg-white px-4 py-4 border-r border-slate-100/60">
                                  <div className="flex items-center justify-center space-x-2">
                                    <button onClick={() => setDetailProject(rec.project)} className="p-2 text-slate-400 hover:text-blue-600 transition-all bg-white rounded-lg border border-slate-200 shadow-sm">
                                      <Eye size={14} />
                                    </button>
                                    {canEditExp && (
                                      <button
                                        onClick={() => setSelectedProjects(prev => prev.find(p => p.id === rec.project.id) ? prev : [...prev, rec.project])}
                                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-sm active:scale-95"
                                      >
                                        引用
                                      </button>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-6 text-xs font-bold text-slate-500 border-r border-slate-100/60">
                                  {rec.project.contractYear}
                                </td>
                                <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">
                                  {rec.project.projectType}
                                </td>
                                <td className="px-6 py-6 text-xs font-bold text-slate-900 border-r border-slate-100/60">
                                  {rec.project.projectName}
                                </td>
                                <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">
                                  {rec.project.clientName}
                                </td>
                                <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">
                                  {rec.project.location}
                                </td>
                                <td className="px-6 py-6 text-xs font-bold text-blue-600 border-r border-slate-100/60 text-center">
                                  {rec.project.amount}W
                                </td>
                                <td className="px-6 py-6 text-[10px] font-bold text-slate-600 uppercase border-r border-slate-100/60">
                                  {rec.project.leader}
                                </td>
                                <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">
                                  {rec.project.signingDate}
                                </td>
                                <td className="px-4 py-4 border-r border-slate-100/60">
                                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase italic ${rec.project.contractStatus === '已完成' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {rec.project.contractStatus}
                                  </span>
                                </td>
                                <td className="px-6 py-6 text-[10px] text-slate-500 font-medium max-w-[200px]">
                                  <div className="line-clamp-2 leading-relaxed italic">{rec.reason}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </section>
                   <div className="h-px bg-slate-100 w-full"></div>
                   <section className="text-left pb-10">
                      <div className="flex items-center justify-between mb-6 text-left">
                        <div className="flex items-center italic text-left">
                          <SearchCode size={24} className="text-slate-400 mr-3" />
                          <h4 className="text-xs font-black text-slate-900 uppercase">全库业绩人工检索</h4>
                        </div>
                        <div className="relative group">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={14} />
                          <input 
                            disabled={!canEditExp} 
                            value={projectSearch} 
                            onChange={e => { setProjectSearch(e.target.value); setPoolPage(1); }}
                            placeholder="检索名称/年份/建设单位..." 
                            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-[11px] font-bold text-slate-700 w-80 focus:border-emerald-500 transition-all shadow-sm" 
                          />
                        </div>
                      </div>
                      <div className="w-full overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm custom-scrollbar-main">
                        <table className="w-full min-w-[1400px] text-left border-separate border-spacing-0">
                          <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                              <th className="sticky left-0 z-20 bg-slate-50 w-36 px-6 py-6 border-r border-b border-slate-200/60 text-center">操作</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">年份</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">类型</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">业绩名称</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">建设单位</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">地点</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60 text-center">金额(W)</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">项目负责人</th>
                              <th className="px-6 py-6 border-r border-b border-slate-200/60">签订日期</th>
                              <th className="px-6 py-6 border-b border-slate-200/60">合同状态</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {(() => {
                              const filtered = fullProjectPool.filter(p => p.projectName.includes(projectSearch));
                              const totalPoolPages = Math.ceil(filtered.length / POOL_PAGE_SIZE);
                              const paged = filtered.slice((poolPage - 1) * POOL_PAGE_SIZE, poolPage * POOL_PAGE_SIZE);
                              return paged.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                                  <td className="sticky left-0 z-10 bg-white px-4 py-4 border-r border-slate-100/60">
                                    <div className="flex items-center justify-center space-x-2">
                                      <button onClick={() => setDetailProject(p)} className="p-2 text-slate-400 hover:text-blue-600 transition-all bg-white rounded-lg border border-slate-200 shadow-sm"><Eye size={14} /></button>
                                      {canEditExp && (<button onClick={() => setSelectedProjects(prev => prev.find(i => i.id === p.id) ? prev : [...prev, p])} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-sm active:scale-95">选用</button>)}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-xs font-bold text-slate-500 border-r border-slate-100/60">{p.contractYear}</td>
                                  <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">{p.projectType}</td>
                                  <td className="px-4 py-4 text-xs font-bold text-slate-900 border-r border-slate-100/60">{p.projectName}</td>
                                  <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">{p.clientName}</td>
                                  <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">{p.location}</td>
                                  <td className="px-4 py-4 text-xs font-bold text-blue-600 border-r border-slate-100/60 text-center">{p.amount}W</td>
                                  <td className="px-4 py-4 text-[10px] font-bold text-slate-600 uppercase border-r border-slate-100/60">{p.leader}</td>
                                  <td className="px-4 py-4 text-[10px] font-medium text-slate-400 uppercase border-r border-slate-100/60">{p.signingDate}</td>
                                  <td className="px-4 py-4">
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase italic ${p.contractStatus === '已完成' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                      {p.contractStatus}
                                    </span>
                                  </td>
                                </tr>
                              ));
                            })()}
                          </tbody>
                        </table>
                      </div>
                      {/* 分页 */}
                      {(() => {
                        const filtered = fullProjectPool.filter(p => p.projectName.includes(projectSearch));
                        const totalPoolPages = Math.ceil(filtered.length / POOL_PAGE_SIZE);
                        if (totalPoolPages <= 1) return null;
                        return (
                          <div className="flex items-center justify-between mt-4 px-1">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                              共 {filtered.length} 条 · 第 {poolPage} / {totalPoolPages} 页
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setPoolPage(p => Math.max(1, p - 1))}
                                disabled={poolPage === 1}
                                className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              >
                                <ChevronLeft size={16} />
                              </button>
                              {Array.from({ length: totalPoolPages }, (_, i) => i + 1).map(p => (
                                <button
                                  key={p}
                                  onClick={() => setPoolPage(p)}
                                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${poolPage === p ? 'bg-blue-600 text-white shadow-md' : 'border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600'}`}
                                >
                                  {p}
                                </button>
                              ))}
                              <button
                                onClick={() => setPoolPage(p => Math.min(totalPoolPages, p + 1))}
                                disabled={poolPage === totalPoolPages}
                                className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              >
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                   </section>                </div>
                <div className={`${isSidebarCollapsed ? 'w-0' : 'w-[400px]'} transition-all duration-300 flex flex-col shrink-0 bg-slate-50 border-l border-slate-200 relative`}>
                  <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -left-4 top-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md z-20 hover:bg-slate-50 transition-colors"
                  >
                    {isSidebarCollapsed ? <ChevronLeft size={16} className="text-slate-600" /> : <ChevronRight size={16} className="text-slate-600" />}
                  </button>
                  
                  {!isSidebarCollapsed && (
                    <div className="p-6 gap-6 flex flex-col animate-in fade-in duration-500">
                      {/* 构件 1: 本工程支撑业绩池 */}
                      <div className="bg-slate-950 rounded-[32px] shadow-2xl flex flex-col border border-white/5 overflow-hidden">
                    <div className="flex flex-col p-6 text-left relative">
                      <div className="flex items-center justify-between mb-6 text-white italic relative z-10 text-left">
                        <div className="flex items-center italic">
                          <DatabaseZap size={20} className="text-emerald-400 mr-3" />
                          <div><h4 className="text-sm font-black uppercase tracking-tighter">支撑业绩池</h4></div>
                        </div>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-[10px] font-black italic tracking-widest">{selectedProjects.length} 项已入选</span>
                      </div>
                      <div className="space-y-3 pr-2 relative z-10 text-left">
                          {selectedProjects.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 opacity-50">
                              <Briefcase size={40} strokeWidth={1} />
                              <p className="text-[10px] font-bold uppercase tracking-widest">暂未指派支撑业绩</p>
                            </div>
                          ) : (
                            selectedProjects.map((p, idx) => (
                              <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-between group text-white text-left animate-in slide-in-from-right-4 transition-all">
                                 <div className="flex items-center space-x-3 min-w-0 flex-1 text-left">
                                   <div className="flex flex-col gap-0.5 shrink-0">
                                     <button onClick={() => moveProject(idx, -1)} disabled={idx === 0} className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20 transition-colors rounded"><ArrowUp size={12} /></button>
                                     <button onClick={() => moveProject(idx, 1)} disabled={idx === selectedProjects.length - 1} className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20 transition-colors rounded"><ArrowDown size={12} /></button>
                                   </div>
                                   <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-black text-xs shrink-0 shadow-lg">{idx + 1}</div>
                                   <div className="text-left min-w-0">
                                     <p className="text-xs font-black italic truncate leading-none mb-1">{p.projectName}</p>
                                     <p className="text-[9px] text-slate-500 font-black uppercase italic tracking-tighter">{p.amount}W · {p.contractYear}年</p>
                                   </div>
                                 </div>
                                 <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                   <button onClick={() => setDetailProject(p)} className="p-2 text-slate-500 hover:text-white"><Maximize2 size={14}/></button>
                                   {canEditExp && (<button onClick={() => setSelectedProjects(selectedProjects.filter((_, i) => i !== idx))} className="p-2 text-slate-500 hover:text-red-400 transition-all"><Trash2 size={14} /></button>)}
                                 </div>
                              </div>
                            ))
                          )}
                      </div>
                    </div>
                  </div>

                  {/* 构件 2: 业绩筛选助理 */}
                  <div className="bg-slate-950 rounded-[32px] shadow-2xl flex flex-col border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent pointer-events-none" />
                    <div className="px-6 py-4 bg-slate-800/30 backdrop-blur-xl flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
                          <Bot size={16} className="text-emerald-400"/>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-white italic">GridGPT 业绩筛选助理</h4>
                          <p className="text-[8px] text-emerald-400/60 font-bold uppercase tracking-tighter">AI-Powered Selection Engine</p>
                        </div>
                      </div>
                      {isAiRecommending && <div className="flex items-center space-x-1 animate-pulse"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span></div>}
                    </div>
                    <div className="p-6 space-y-6 relative z-10 overflow-y-auto max-h-72 custom-scrollbar-dark">
                      {expAiChatMessages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-6">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Sparkles size={20} className="text-emerald-400 opacity-50" />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                            您可以输入具体的要求来进一步筛选业绩，例如：<br/>
                            <span className="text-emerald-400/70">“需要金额大于500万的项目”</span>
                          </p>
                        </div>
                      ) : (
                        expAiChatMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                            <div className={`max-w-[90%] p-4 rounded-2xl text-[10px] leading-relaxed shadow-xl ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none font-bold' : 'bg-slate-800/80 text-slate-300 border border-white/10 rounded-tl-none italic font-medium'}`}>
                              {msg.text}
                            </div>
                          </div>
                        ))
                      )}
                      {isAiRecommending && (
                        <div className="flex justify-start animate-in fade-in">
                          <div className="bg-slate-800/80 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center space-x-3">
                            <RefreshCw size={14} className="text-emerald-400 animate-spin" />
                            <span className="text-[10px] text-emerald-400 font-black uppercase italic tracking-widest">正在深度分析...</span>
                          </div>
                        </div>
                      )}
                      <div ref={expAiChatBottomRef} />
                    </div>
                    <div className="p-6 bg-slate-950/80 border-t border-white/10 relative z-10">
                      <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-emerald-500/50 focus-within:bg-white/10 transition-all shadow-inner">
                        <input 
                          value={expAiChatInput} 
                          onChange={e => setExpAiChatInput(e.target.value)} 
                          onKeyDown={e => e.key === 'Enter' && handleExpAiChatSend()}
                          placeholder="输入筛选指令..." 
                          className="flex-1 bg-transparent border-none outline-none text-white text-[10px] px-3 font-medium placeholder:text-slate-700" 
                        />
                        <button onClick={handleExpAiChatSend} className="bg-emerald-600 p-3 text-white rounded-xl hover:bg-emerald-500 shadow-lg active:scale-90 transition-all flex items-center justify-center">
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                    </div>
                  )}
                </div>
              </div>
          </div>
        )}

        {/* 技术方案编撰环节 */}
        {phase === 'task' && activeTaskId === 'content' && (
          <div className="w-full flex flex-col bg-white rounded-[48px] border border-slate-200 shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left max-h-[90vh] overflow-hidden">
             <div className="px-12 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-left">
                <div className="flex items-center space-x-6 text-left">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-purple-600 shadow-purple-100"><FileText size={24}/></div>
                   <div><h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">技术方案智能深度编撰</h3></div>
                </div>
                <div className="flex space-x-4">{canEditContent && (<button onClick={() => markTaskCompleted('content')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl active:scale-95"><CheckCircle2 size={18} className="mr-3 inline" /> 完成并锁定环节</button>)}</div>
             </div>
             <div className="flex flex-1 min-h-0">
                <div className="flex-[2] flex flex-col border-r border-slate-100 bg-white relative">
                   <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center space-x-4 shrink-0 text-left">
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm"><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><Bold size={18}/></button><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><Italic size={18}/></button></div>
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm"><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><List size={18}/></button></div>
                   </div>
                   <div className="p-16 custom-scrollbar-main font-serif bg-white text-left relative">
                      {!canEditContent && (<div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] pointer-events-none"><div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl flex items-center space-x-3 text-slate-400"><LockKeyhole size={20}/><span className="text-xs font-black uppercase tracking-widest italic">文档受控</span></div></div>)}
                      <textarea readOnly={!canEditContent} className="w-full h-full min-h-[600px] text-xl leading-relaxed text-slate-800 bg-transparent border-none outline-none resize-none font-serif tracking-tight text-left" value={draftContent} onChange={(e) => setDraftContent(e.target.value)} />
                   </div>
                </div>
                <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent pointer-events-none" />
                   <div className="px-8 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col space-y-4 relative z-10 text-white italic text-left">
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-3 text-left"><Bot size={20} className="text-purple-400"/><h4 className="text-xs font-black uppercase tracking-widest text-left">GridGPT 文档编写助理</h4></div>{isFilesProcessing && <div className="flex items-center space-x-2 animate-pulse"><span className="w-2 h-2 bg-purple-400 rounded-full"></span><span className="text-[9px] font-black uppercase text-purple-400">分析参考资料中...</span></div>}</div>
                   </div>
                   <div className="p-6 border-b border-white/5 bg-white/[0.02] relative z-10">
                      <div className="flex items-center justify-between mb-4"><div className="flex items-center text-[10px] font-black text-slate-500 uppercase tracking-widest"><FileArchive size={14} className="mr-2"/> 多维参考资料库</div><button disabled={!canEditContent} onClick={() => fileInputRef.current?.click()} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"><Plus size={16}/></button><input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" /></div>
                      <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar-dark pr-1">
                         {referenceFiles.map(file => (<div key={file.id} className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group animate-in slide-in-from-right-2 text-left text-white"><div className="flex items-center space-x-3 min-w-0"><div className="p-2 bg-purple-600/20 text-purple-400 rounded-xl"><FileText size={14}/></div><div className="min-w-0"><p className="text-[10px] font-bold text-slate-200 truncate">{file.name}</p><p className="text-[8px] text-slate-500 font-black uppercase mt-0.5">{file.type} · {file.size}</p></div></div>{canEditContent && <button onClick={() => setReferenceFiles(prev => prev.filter(f => f.id !== file.id))} className="p-1.5 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14}/></button>}</div>))}
                         {referenceFiles.length === 0 && <div className="py-4 text-center border-2 border-dashed border-white/5 rounded-2xl text-[9px] font-black text-slate-700 uppercase tracking-widest italic">暂无外部参考资料</div>}
                      </div>
                   </div>
                   <div className="flex-1 min-h-0 overflow-y-auto p-8 space-y-6 custom-scrollbar-dark relative z-10 text-left">
                      {aiChatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}><div className={`max-w-[85%] p-5 rounded-3xl text-[11px] leading-relaxed shadow-2xl relative ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none font-bold' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none italic font-medium'}`}>{msg.text}</div></div>
                      ))}
                      {isAiRecommending && <div className="flex justify-start animate-pulse"><div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none"><Wand2 size={20} className="text-purple-400 animate-spin" /></div></div>}
                      <div ref={aiChatBottomRef} />
                   </div>
                   <div className="p-8 bg-slate-900/80 border-t border-white/5 relative z-10 text-left">
                      <div className={`flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl p-2 transition-all text-left ${!canEditContent ? 'opacity-30' : ''}`}><button disabled={!canEditContent} onClick={() => fileInputRef.current?.click()} className="p-3 text-slate-500 hover:text-purple-400 transition-colors"><Paperclip size={18} /></button><textarea disabled={!canEditContent} value={aiChatInput} onChange={e => setAiChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAiChatSend())} placeholder={canEditContent ? "输入指令..." : "只读模式..." } className="flex-1 bg-transparent border-none outline-none text-white text-[11px] px-3 font-medium placeholder:text-slate-700 resize-none h-12 py-2 text-left" /><button disabled={!canEditContent} onClick={handleAiChatSend} className="bg-purple-600 p-3 text-white rounded-xl hover:bg-purple-500 shadow-xl transition-all active:scale-90 text-left disabled:opacity-50"><Send size={18} /></button></div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 极致仿真预览大视图 (业绩/人员) */}
        {(phase === 'exp_preview' || phase === 'team_preview') && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5 text-left">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white z-10 shrink-0 text-left">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10 text-left">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl italic font-black uppercase tracking-tighter">缩小</button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl italic font-black uppercase tracking-tighter">放大</button>
                   </div>
                   <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-emerald-400 flex items-center uppercase tracking-widest">
                        <BadgeCheck size={18} className="mr-3" /> {phase === 'exp_preview' ? '标书项目业绩全案 1:1 仿真预览 (对齐 Word 标准)' : '项目团队预览'}
                      </span>
                      {phase === 'team_preview' && projectLeaderId && (
                        <span className="text-[10px] text-blue-400 font-black mt-1 uppercase tracking-widest italic animate-pulse">
                          Auto-Sorted: 负责人 {selectedPersonnel.find(p => p.id === projectLeaderId)?.name} 已置于首页
                        </span>
                      )}
                   </div>
                </div>
                <div className="flex space-x-4">
                  <button className="px-8 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] shadow-lg hover:bg-blue-700 transition-all flex items-center">
                    <Download size={16} className="mr-2" /> 下载最终生成的 Word
                  </button>
                  <button onClick={() => setPhase('task')} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all text-left">返回控制台</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark scroll-smooth text-left">
                  <div className="origin-top transition-all space-y-24 text-left" style={{ transform: `scale(${zoomLevel / 100})` }}>
                    {phase === 'exp_preview'
                      ? (<><ProjectSummaryTable />{selectedProjects.map((p) => <ProjectFullDocumentMerged key={p.id} project={p} />)}</>)
                      : (<>
                          <TeamSummaryTable />
                          {previewPersonnelList.map((p) => <PersonnelFullDocumentMerged key={p.id} person={p} isLeader={p.id === projectLeaderId} />)}
                        </>)}
                    {(phase === 'exp_preview' ? selectedProjects : selectedPersonnel).length === 0 && (
                      <div className="text-slate-600 italic uppercase tracking-[0.4em] mt-40 flex flex-col items-center">
                        <Layout size={64} strokeWidth={1} className="mb-6 opacity-30" />
                        No assets selected for preview
                      </div>
                    )}
                  </div>
              </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 20px; }
        .custom-scrollbar-main::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default BidWorkspaceView;