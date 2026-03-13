
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  MonitorPlay,
  Search,
  Activity,
  Clock,
  AlertCircle,
  Coins,
  Target,
  Users2,
  DatabaseZap,
  FileEdit,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { BiddingTask, PhaseStatus } from '../types';

interface ManagerViewProps {
  activeTasks: BiddingTask[];
}

const STAGES = [
  { key: 'team_matched', label: '成员拟定', icon: Users2 },
  { key: 'experience_linked', label: '业绩遴选', icon: DatabaseZap },
  { key: 'tech_drafting', label: '文档撰写', icon: FileEdit },
  { key: 'bid_submitted', label: '完成投标', icon: Send },
];

const GAP = 12; // gap-3 = 12px

const MOCK_EXTRA: BiddingTask[] = [
  {
    id: 'mock-003', projectId: 'SGCC-2024-PJ03', type: '服务', title: '国网山东电力2024年配网自动化终端采购项目',
    lotName: '包2：配网自动化开关设备', purchaser: '国网山东省电力有限公司', category: '信通类',
    publishDate: '2024-10-18', deadline: '2024-11-20', status: 'analyzed', budget: '620万元',
    platform: '国网', priority: 'medium', source: 'crawler', assignDate: '2024-10-19',
    progress: 60, currentStage: 'reviewing', openingTime: '2024-11-21 09:00:00', openingLocation: '济南招标大厅',
    projectLeader: { id: 'gt4', name: '孙经理', role: '商务总监', years: 14, majorProject: '物资集采', tags: ['商务'] },
    isExpDone: true, isTeamDone: true, isContentDone: false,
    expStatus: PhaseStatus.COMPLETED, teamStatus: PhaseStatus.COMPLETED, contentStatus: PhaseStatus.IN_PROGRESS,
  },
  {
    id: 'mock-004', projectId: 'CSG-2024-PJ04', type: '物资', title: '2024年南网广西电网继电保护装置框架采购',
    lotName: '包1：220kV线路保护装置', purchaser: '广西电网有限责任公司', category: '变电类',
    publishDate: '2024-10-22', deadline: '2024-11-28', status: 'analyzed', budget: '980万元',
    platform: '南网', priority: 'high', source: 'ai', assignDate: '2024-10-23',
    progress: 30, currentStage: 'team_assigned', openingTime: '2024-11-29 10:00:00', openingLocation: '南宁公共资源交易中心',
    projectLeader: { id: 'm2', name: '李经理', role: '技术主管', years: 10, majorProject: '云平台', tags: ['技术'] },
    isExpDone: false, isTeamDone: true, isContentDone: false,
    expStatus: PhaseStatus.NOT_STARTED, teamStatus: PhaseStatus.COMPLETED, contentStatus: PhaseStatus.NOT_STARTED,
  },
  {
    id: 'mock-005', projectId: 'SGCC-2024-PJ05', type: '工程', title: '国网湖北电力2024年输电线路铁塔组立工程',
    lotName: '包3：500kV铁塔基础施工', purchaser: '国网湖北省电力有限公司', category: '线路类',
    publishDate: '2024-10-25', deadline: '2024-12-05', status: 'analyzed', budget: '1500万元',
    platform: '国网', priority: 'medium', source: 'crawler', assignDate: '2024-10-26',
    progress: 15, currentStage: 'scanned', openingTime: '2024-12-06 09:00:00', openingLocation: '武汉招标大厅',
    projectLeader: null as any, isExpDone: false, isTeamDone: false, isContentDone: false,
    expStatus: PhaseStatus.NOT_STARTED, teamStatus: PhaseStatus.NOT_STARTED, contentStatus: PhaseStatus.NOT_STARTED,
  },
  {
    id: 'mock-006', projectId: 'SGCC-2024-PJ06', type: '物资', title: '国网江苏电力2024年第三次配网物资协议库存招标',
    lotName: '包4：低压配电箱及计量箱', purchaser: '国网江苏省电力有限公司', category: '综合类',
    publishDate: '2024-10-28', deadline: '2024-12-10', status: 'analyzed', budget: '430万元',
    platform: '国网', priority: 'medium', source: 'crawler', assignDate: '2024-10-29',
    progress: 80, currentStage: 'drafting', openingTime: '2024-12-11 09:00:00', openingLocation: '南京公共资源交易中心',
    projectLeader: { id: 'gt6', name: '陈工', role: '商务助理', years: 5, majorProject: '投标上传', tags: ['商务'] },
    isExpDone: true, isTeamDone: true, isContentDone: true,
    expStatus: PhaseStatus.COMPLETED, teamStatus: PhaseStatus.COMPLETED, contentStatus: PhaseStatus.COMPLETED,
  },
  {
    id: 'mock-007', projectId: 'CSG-2024-PJ07', type: '服务', title: '2024年云南电网有限责任公司输变电运检服务外包',
    lotName: '包1：昆明区域变电站运维', purchaser: '云南电网有限责任公司', category: '信通类',
    publishDate: '2024-10-30', deadline: '2024-12-15', status: 'analyzed', budget: '760万元',
    platform: '南网', priority: 'high', source: 'ai', assignDate: '2024-10-31',
    progress: 45, currentStage: 'team_assigned', openingTime: '2024-12-16 10:00:00', openingLocation: '昆明招标大厅',
    projectLeader: { id: 'm1', name: '张经理', role: '资深项目总监', score: 98, years: 15, majorProject: '国网浙江500kV站改', tags: ['商务'] },
    isExpDone: true, isTeamDone: false, isContentDone: false,
    expStatus: PhaseStatus.COMPLETED, teamStatus: PhaseStatus.IN_PROGRESS, contentStatus: PhaseStatus.NOT_STARTED,
  },
  {
    id: 'mock-008', projectId: 'SGCC-2024-PJ08', type: '工程', title: '国网四川电力2024年城区配网改造工程',
    lotName: '包2：成都中心城区电缆敷设', purchaser: '国网四川省电力有限公司', category: '线路类',
    publishDate: '2024-11-01', deadline: '2024-12-20', status: 'analyzed', budget: '2100万元',
    platform: '国网', priority: 'high', source: 'crawler', assignDate: '2024-11-02',
    progress: 5, currentStage: 'scanned', openingTime: '2024-12-21 09:00:00', openingLocation: '成都公共资源交易中心',
    projectLeader: null as any, isExpDone: false, isTeamDone: false, isContentDone: false,
    expStatus: PhaseStatus.NOT_STARTED, teamStatus: PhaseStatus.NOT_STARTED, contentStatus: PhaseStatus.NOT_STARTED,
  },
];

const ManagerView: React.FC<ManagerViewProps> = ({ activeTasks }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);

  const calcPageSize = useCallback(() => {
    const container = listContainerRef.current;
    const firstRow = firstRowRef.current;
    if (!container || !firstRow) return;
    const rowH = firstRow.offsetHeight;
    if (rowH === 0) return;
    const style = getComputedStyle(container);
    const usableH = container.clientHeight - parseFloat(style.paddingTop);
    const count = Math.max(1, Math.floor((usableH + GAP) / (rowH + GAP)));
    setPageSize(prev => prev !== count ? count : prev);
  }, []);

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(calcPageSize);
    ro.observe(container);
    calcPageSize();
    return () => ro.disconnect();
  }, [calcPageSize]);

  const getMappedStage = (task: BiddingTask) => {
    if (task.currentStage === 'submitted') return 'bid_submitted';
    if (task.currentStage === 'reviewing') return 'tech_drafting';
    if (task.currentStage === 'drafting') return 'tech_drafting';
    return task.currentStage || 'team_matched';
  };

  const allProjects = useMemo(() => {
    return [...activeTasks, ...MOCK_EXTRA].map(t => ({
      ...t,
      stageKey: getMappedStage(t)
    }));
  }, [activeTasks]);

  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return allProjects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.lotName?.toLowerCase().includes(q) ||
      p.projectId.toLowerCase().includes(q)
    );
  }, [allProjects, searchQuery]);

  const totalPages = Math.ceil(allProjects.length / pageSize);
  const pagedProjects = allProjects.slice((page - 1) * pageSize, page * pageSize);

  const stats = {
    totalLots: allProjects.length,
    urgent: allProjects.filter(t => t.priority === 'high').length,
    avgProgress: Math.round(allProjects.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (allProjects.length || 1)),
    totalValue: allProjects.reduce((acc, curr) => {
      const b = parseInt(curr.budget?.replace(/[^0-9]/g, '') || '0');
      return acc + b;
    }, 0)
  };

  return (
    <div className="h-full flex flex-col gap-4 p-8 animate-in fade-in duration-500 text-left">

      {/* 顶部标题栏 */}
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
          <MonitorPlay size={28} className="mr-3 text-blue-600" /> 总经理投标全局视窗
        </h2>

        <div className="relative w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="搜索项目名称或指定标包..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-sm shadow-inner"
          />
          {searchQuery && (
            <div className="absolute top-full mt-3 left-0 w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in slide-in-from-top-2">
              <div className="max-h-80 overflow-y-auto custom-scrollbar-main space-y-2">
                {filteredResults.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4 font-bold">无匹配结果</p>
                )}
                {filteredResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSearchQuery('')}
                    className="p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors flex items-center"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mr-3 text-white bg-blue-600">
                      <Target size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 truncate italic">{p.lotName}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{p.projectId} · {p.purchaser}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 统计栏 */}
      <div className="flex items-center gap-6 shrink-0 bg-white rounded-2xl border border-slate-200 px-6 py-3 shadow-sm">
        {[
          { label: '在投活跃标包', value: stats.totalLots, unit: 'LOTS', icon: Target, color: 'text-blue-600' },
          { label: '高优先级警告', value: stats.urgent, unit: 'ALERTS', icon: AlertCircle, color: 'text-red-500' },
          { label: '全案平均进度', value: `${stats.avgProgress}%`, unit: 'AVG', icon: Activity, color: 'text-emerald-500' },
          { label: '预计标的价值', value: `${stats.totalValue}W`, unit: 'CNY', icon: Coins, color: 'text-amber-500' },
        ].map((stat, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
            <div className="flex items-center gap-3">
              <stat.icon size={16} className={stat.color} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <span className="text-lg font-black text-slate-900 tracking-tighter">{stat.value}</span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{stat.unit}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* 看板主体 */}
      <div className="flex-1 min-h-0 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">

        {/* 看板头 */}
        <div className="px-8 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-950 text-white rounded-xl shadow-lg"><MonitorPlay size={18} /></div>
            <h3 className="text-base font-black text-slate-900 uppercase italic tracking-tight">活跃标包业务流看板</h3>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-1.5 rounded-xl border border-emerald-100">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1"></span>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">GridGPT 数据同步中</span>
          </div>
        </div>

        {/* 列表区域 */}
        <div ref={listContainerRef} className="flex-1 min-h-0 flex flex-col p-6 gap-3 overflow-hidden">
          {pagedProjects.map((lot, idx) => (
            <div
              key={lot.id}
              ref={idx === 0 ? firstRowRef : undefined}
              className="bg-slate-50 border border-slate-100 rounded-[28px] px-6 py-4 flex items-center gap-6 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all group relative overflow-hidden"
            >
              {/* 优先级条 */}
              <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-[28px] ${lot.priority === 'high' ? 'bg-red-500' : 'bg-slate-300'}`} />

              {/* LOT 徽章 */}
              <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-black shadow-md shrink-0 text-white ml-2 ${lot.priority === 'high' ? 'bg-red-500' : 'bg-slate-900'}`}>
                <span className="text-[8px] uppercase opacity-50 tracking-tighter">LOT</span>
                <span className="text-sm leading-none">#{lot.id.slice(-2)}</span>
              </div>

              {/* 项目信息 */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-widest italic shrink-0">{lot.projectId}</span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase italic truncate">{lot.purchaser}</p>
                </div>
                <h4 className="text-sm font-black text-slate-900 truncate italic leading-tight tracking-tight">{lot.lotName}</h4>
              </div>

              {/* 节点进度 + 进度条 */}
              <div className="flex flex-col gap-2 shrink-0 w-96">
                <div className="flex items-center gap-2">
                  {STAGES.map((s, i) => {
                    const currentIdx = STAGES.findIndex(st => st.key === lot.stageKey);
                    const isDone = i <= currentIdx;
                    const StageIcon = s.icon;
                    return (
                      <div key={s.key} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isDone ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                          <StageIcon size={13} strokeWidth={2.5} />
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-tighter italic text-center leading-tight ${isDone ? 'text-blue-600' : 'text-slate-300'}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-700 relative"
                    style={{ width: `${lot.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:12px_12px] animate-[shimmer_2s_linear_infinite]" />
                  </div>
                </div>
              </div>

              {/* 截止日期 */}
              <div className="text-right shrink-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 flex items-center justify-end italic"><Clock size={10} className="mr-1" />截止</p>
                <p className="text-xs font-black text-red-500 tracking-tight italic">{lot.deadline}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            共 {allProjects.length} 条 · 第 {page} / {totalPages} 页
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                  page === p
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0 0; }
          100% { background-position: 24px 0; }
        }
      `}</style>
    </div>
  );
};

export default ManagerView;
