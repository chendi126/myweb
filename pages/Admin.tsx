import React, { useState } from 'react';
import { useData, SiteData } from '../context/DataContext';
import { Save, Plus, Trash2, Upload, Loader } from 'lucide-react';

const InputField = ({ label, value, onChange, multiline = false }: { label: string, value: string, onChange: (val: string) => void, multiline?: boolean }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {multiline ? (
      <textarea 
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
        rows={4}
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    ) : (
      <input 
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    )}
  </div>
);

const Admin: React.FC = () => {
  const { data, loading, error, updateData, uploadImage } = useData();
  const [formData, setFormData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'projects' | 'experiences' | 'navbar' | 'contact'>('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Sync local state with context data when loaded
  React.useEffect(() => {
    if (data) {
      setFormData(JSON.parse(JSON.stringify(data)));
    }
  }, [data]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!formData) return null;

  const TAB_LABELS: Record<'hero' | 'about' | 'projects' | 'experiences' | 'navbar' | 'contact', string> = {
    hero: '首页',
    about: '关于',
    projects: '项目',
    experiences: '经历',
    navbar: '导航栏',
    contact: '联系页',
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await updateData(formData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      console.error(e);
      setSaveStatus('error');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: (url: string) => void) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadImage(e.target.files[0]);
        fieldPath(url);
      } catch (err) {
        alert('上传失败');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">后台管理</h1>
        </div>
        <nav className="p-4 space-y-2">
          {(['hero', 'about', 'projects', 'experiences', 'navbar', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`w-full text-left px-4 py-2 rounded capitalize ${activeTab === tab ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold">{TAB_LABELS[activeTab]}设置</h2>
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saveStatus === 'saving' ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
            {saveStatus === 'saving' ? '保存中...' : saveStatus === 'saved' ? '已保存' : '保存'}
          </button>
        </header>

        <div className="p-8 max-w-4xl">
          {activeTab === 'hero' && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <InputField label="状态标识" value={formData.hero.status} onChange={(v) => setFormData({...formData, hero: {...formData.hero, status: v}})} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="主标题前半" value={formData.hero.titlePrefix} onChange={(v) => setFormData({...formData, hero: {...formData.hero, titlePrefix: v}})} />
                <InputField label="主标题后半" value={formData.hero.titleSuffix} onChange={(v) => setFormData({...formData, hero: {...formData.hero, titleSuffix: v}})} />
              </div>
              <InputField label="描述（支持 HTML）" value={formData.hero.description} multiline onChange={(v) => setFormData({...formData, hero: {...formData.hero, description: v}})} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="主按钮文案" value={formData.hero.buttonText} onChange={(v) => setFormData({...formData, hero: {...formData.hero, buttonText: v}})} />
                <InputField label="简历按钮文案" value={formData.hero.resumeText} onChange={(v) => setFormData({...formData, hero: {...formData.hero, resumeText: v}})} />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="标题前缀" value={formData.about.titlePrefix} onChange={(v) => setFormData({...formData, about: {...formData.about, titlePrefix: v}})} />
                <InputField label="高亮标题" value={formData.about.titleHighlight} onChange={(v) => setFormData({...formData, about: {...formData.about, titleHighlight: v}})} />
              </div>
              <div className="flex gap-4 items-center">
                <img src={formData.about.imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded" />
                <label className="cursor-pointer px-4 py-2 border rounded hover:bg-gray-50 flex items-center gap-2">
                  <Upload size={16} /> 更换图片
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setFormData({...formData, about: {...formData.about, imageUrl: url}}))} />
                </label>
              </div>
              <InputField label="描述段落 1" value={formData.about.description1} multiline onChange={(v) => setFormData({...formData, about: {...formData.about, description1: v}})} />
              <InputField label="描述段落 2" value={formData.about.description2} multiline onChange={(v) => setFormData({...formData, about: {...formData.about, description2: v}})} />
              
              <h3 className="font-medium text-gray-900 mt-6">统计</h3>
              {formData.about.stats.map((stat, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
                  <InputField label="数值（例如 30+）" value={stat.value} onChange={(v) => {
                    const newStats = [...formData.about.stats];
                    newStats[idx] = { ...newStats[idx], value: v };
                    setFormData({...formData, about: {...formData.about, stats: newStats}});
                  }} />
                  <InputField label="标签" value={stat.label} onChange={(v) => {
                    const newStats = [...formData.about.stats];
                    newStats[idx] = { ...newStats[idx], label: v };
                    setFormData({...formData, about: {...formData.about, stats: newStats}});
                  }} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {formData.projects.map((project, idx) => (
                <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border relative group">
                  <button 
                    onClick={() => {
                      const newProjects = formData.projects.filter((_, i) => i !== idx);
                      setFormData({...formData, projects: newProjects});
                    }}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={20} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <InputField label="项目标题" value={project.title} onChange={(v) => {
                        const newP = [...formData.projects];
                        newP[idx] = { ...newP[idx], title: v };
                        setFormData({...formData, projects: newP});
                      }} />
                      <InputField label="分类" value={project.category} onChange={(v) => {
                        const newP = [...formData.projects];
                        newP[idx] = { ...newP[idx], category: v };
                        setFormData({...formData, projects: newP});
                      }} />
                       <InputField label="年份" value={project.year} onChange={(v) => {
                        const newP = [...formData.projects];
                        newP[idx] = { ...newP[idx], year: v };
                        setFormData({...formData, projects: newP});
                      }} />
                      <InputField label="案例链接" value={project.caseStudyUrl} onChange={(v) => {
                        const newP = [...formData.projects];
                        newP[idx] = { ...newP[idx], caseStudyUrl: v };
                        setFormData({...formData, projects: newP});
                      }} />
                    </div>
                    <div className="space-y-4">
                       <div className="flex gap-4 items-center">
                        <img src={project.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded bg-gray-100" />
                      </div>
                      <label className="cursor-pointer w-full py-2 border border-dashed rounded flex justify-center items-center gap-2 hover:bg-gray-50 text-gray-500">
                          <Upload size={16} /> 上传封面
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => {
                            const newP = [...formData.projects];
                            newP[idx] = { ...newP[idx], imageUrl: url };
                            setFormData({...formData, projects: newP});
                          })} />
                        </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <InputField label="描述" value={project.description} multiline onChange={(v) => {
                        const newP = [...formData.projects];
                        newP[idx] = { ...newP[idx], description: v };
                        setFormData({...formData, projects: newP});
                      }} />
                  </div>
                  <div className="mt-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">标签（逗号分隔）</label>
                     <input 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={project.tags.join(', ')} 
                      onChange={(e) => {
                        const newP = [...formData.projects];
                        newP[idx] = { ...newP[idx], tags: e.target.value.split(',').map(s => s.trim()) };
                        setFormData({...formData, projects: newP});
                      }} 
                    />
                  </div>
                </div>
              ))}
              <button 
                onClick={() => {
                  setFormData({
                    ...formData, 
                    projects: [...formData.projects, {
                      id: Date.now().toString(),
                      title: '新项目',
                      category: '分类',
                      description: '描述...',
                      imageUrl: 'https://via.placeholder.com/800',
                      caseStudyUrl: 'https://www.bilibili.com/',
                      year: new Date().getFullYear().toString(),
                      tags: ['标签']
                    }]
                  });
                }}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} /> 添加项目
              </button>
            </div>
          )}

           {activeTab === 'experiences' && (
            <div className="space-y-6">
              {formData.experiences.map((exp, idx) => (
                <div key={exp.id} className="bg-white p-6 rounded-xl shadow-sm border relative group">
                  <button 
                    onClick={() => {
                      const newExp = formData.experiences.filter((_, i) => i !== idx);
                      setFormData({...formData, experiences: newExp});
                    }}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={20} />
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <InputField label="职位" value={exp.role} onChange={(v) => {
                        const newE = [...formData.experiences];
                        newE[idx] = { ...newE[idx], role: v };
                        setFormData({...formData, experiences: newE});
                      }} />
                      <InputField label="公司" value={exp.company} onChange={(v) => {
                        const newE = [...formData.experiences];
                        newE[idx] = { ...newE[idx], company: v };
                        setFormData({...formData, experiences: newE});
                      }} />
                  </div>
                   <InputField label="时间" value={exp.period} onChange={(v) => {
                        const newE = [...formData.experiences];
                        newE[idx] = { ...newE[idx], period: v };
                        setFormData({...formData, experiences: newE});
                      }} />
                   <InputField label="描述" value={exp.description} multiline onChange={(v) => {
                        const newE = [...formData.experiences];
                        newE[idx] = { ...newE[idx], description: v };
                        setFormData({...formData, experiences: newE});
                      }} />
                </div>
              ))}
               <button 
                onClick={() => {
                  setFormData({
                    ...formData, 
                    experiences: [...formData.experiences, {
                      id: Date.now().toString(),
                      role: '新职位',
                      company: '公司',
                      period: '2024',
                      description: '描述...'
                    }]
                  });
                }}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} /> 添加经历
              </button>
            </div>
           )}

          {activeTab === 'navbar' && (
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="品牌前缀" value={formData.navbar.brandPrefix} onChange={(v) => setFormData({ ...formData, navbar: { ...formData.navbar, brandPrefix: v } })} />
                <InputField label="品牌后缀" value={formData.navbar.brandSuffix} onChange={(v) => setFormData({ ...formData, navbar: { ...formData.navbar, brandSuffix: v } })} />
              </div>
              <InputField label="右侧按钮文案" value={formData.navbar.contactButtonText} onChange={(v) => setFormData({ ...formData, navbar: { ...formData.navbar, contactButtonText: v } })} />

              <div>
                <h3 className="font-medium text-gray-900 mb-4">菜单项</h3>
                <div className="space-y-4">
                  {formData.navbar.navLinks.map((link, idx) => (
                    <div key={link.id} className="grid grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
                      <div className="text-sm text-gray-600 flex items-center">区块：{link.id}</div>
                      <InputField label="显示名称" value={link.label} onChange={(v) => {
                        const newLinks = [...formData.navbar.navLinks];
                        newLinks[idx] = { ...newLinks[idx], label: v };
                        setFormData({ ...formData, navbar: { ...formData.navbar, navLinks: newLinks } });
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="标题前缀" value={formData.contact.titlePrefix} onChange={(v) => setFormData({ ...formData, contact: { ...formData.contact, titlePrefix: v } })} />
                <InputField label="高亮标题" value={formData.contact.titleHighlight} onChange={(v) => setFormData({ ...formData, contact: { ...formData.contact, titleHighlight: v } })} />
              </div>
              <InputField label="说明文字" value={formData.contact.message} multiline onChange={(v) => setFormData({ ...formData, contact: { ...formData.contact, message: v } })} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="邮箱地址（mailto）" value={formData.contact.emailAddress} onChange={(v) => setFormData({ ...formData, contact: { ...formData.contact, emailAddress: v } })} />
                <InputField label="邮箱显示文本" value={formData.contact.emailText} onChange={(v) => setFormData({ ...formData, contact: { ...formData.contact, emailText: v } })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="页脚左侧" value={formData.contact.footerLeft} onChange={(v) => setFormData({ ...formData, contact: { ...formData.contact, footerLeft: v } })} />
                <InputField label="页脚右侧" value={formData.contact.footerRight} onChange={(v) => setFormData({ ...formData, contact: { ...formData.contact, footerRight: v } })} />
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">社交链接</h3>
                <div className="space-y-4">
                  {formData.socialLinks.map((link, idx) => (
                    <div key={link.icon} className="grid grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
                      <InputField label="名称" value={link.name} onChange={(v) => {
                        const newLinks = [...formData.socialLinks];
                        newLinks[idx] = { ...newLinks[idx], name: v };
                        setFormData({ ...formData, socialLinks: newLinks });
                      }} />
                      <InputField label="跳转链接" value={link.url} onChange={(v) => {
                        const newLinks = [...formData.socialLinks];
                        newLinks[idx] = { ...newLinks[idx], url: v };
                        setFormData({ ...formData, socialLinks: newLinks });
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
