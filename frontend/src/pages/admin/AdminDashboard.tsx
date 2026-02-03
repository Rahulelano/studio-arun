import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
    LayoutDashboard,
    Image as ImageIcon,
    FileText,
    LogOut,
    Plus,
    Trash2,
    Upload,
    Loader2
} from 'lucide-react';

interface GalleryItem {
    id: string;
    src: string;
    category: string;
    title: string;
}

interface BlogPost {
    id: string;
    title: string;
    category: string;
    date: string;
    image: string;
    excerpt: string;
    content: string;
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'gallery' | 'blog'>('gallery');
    const [isLoading, setIsLoading] = useState(false);

    // Gallery State
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imageCategory, setImageCategory] = useState('');
    const [imageTitle, setImageTitle] = useState('');

    // Blog State
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogExcerpt, setBlogExcerpt] = useState('');
    const [blogTags, setBlogTags] = useState('');
    const [blogKeywords, setBlogKeywords] = useState('');
    const [blogImage, setBlogImage] = useState<File | null>(null);
    const [blogAdditionalImages, setBlogAdditionalImages] = useState<FileList | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchGallery();
        fetchBlog();
    }, [navigate]);

    const fetchGallery = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/gallery');
            const data = await res.json();
            setGalleryItems(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Failed to fetch gallery", e);
        }
    };

    const fetchBlog = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/blog');
            const data = await res.json();
            setBlogPosts(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Failed to fetch blog", e);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const handleUploadGallery = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImage) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', newImage);
        formData.append('category', imageCategory);
        formData.append('title', imageTitle);

        try {
            const res = await fetch('http://localhost:3000/api/gallery', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                toast.success("Image uploaded successfully");
                setNewImage(null);
                setImageCategory('');
                setImageTitle('');
                fetchGallery();
            } else {
                toast.error("Upload failed");
            }
        } catch (e) {
            toast.error("Error uploading image");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteGallery = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:3000/api/gallery/${id}`, { method: 'DELETE' });
            toast.success("Image deleted");
            fetchGallery();
        } catch (e) {
            toast.error("Delete failed");
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!blogTitle || !blogContent) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', blogTitle);
        formData.append('category', blogCategory);
        formData.append('content', blogContent);
        formData.append('excerpt', blogExcerpt);
        formData.append('tags', blogTags);
        formData.append('keywords', blogKeywords);

        if (blogImage) formData.append('image', blogImage);

        if (blogAdditionalImages) {
            Array.from(blogAdditionalImages).forEach((file) => {
                formData.append('additionalImages', file);
            });
        }

        try {
            const res = await fetch('http://localhost:3000/api/blog', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                toast.success("Post created successfully");
                setBlogTitle('');
                setBlogCategory('');
                setBlogContent('');
                setBlogExcerpt('');
                setBlogTags('');
                setBlogKeywords('');
                setBlogImage(null);
                setBlogAdditionalImages(null);
                fetchBlog();
            } else {
                toast.error("Failed to create post");
            }
        } catch (e) {
            toast.error("Error creating post");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:3000/api/blog/${id}`, { method: 'DELETE' });
            toast.success("Post deleted");
            fetchBlog();
        } catch (e) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-white/5 flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-[#D4AF37]">Studio Admin</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'gallery' ? 'bg-[#D4AF37] text-black' : 'hover:bg-white/5'}`}
                    >
                        <ImageIcon size={20} />
                        <span>Gallery</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('blog')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'blog' ? 'bg-[#D4AF37] text-black' : 'hover:bg-white/5'}`}
                    >
                        <FileText size={20} />
                        <span>Blog</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                {activeTab === 'gallery' && (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-light mb-8">Gallery Management</h2>

                        {/* Upload Section */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <Upload size={20} className="text-[#D4AF37]" />
                                Upload New Image
                            </h3>
                            <form onSubmit={handleUploadGallery} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div className="md:col-span-1">
                                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                                    <select
                                        value={imageCategory}
                                        onChange={(e) => setImageCategory(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Portrait">Portrait</option>
                                        <option value="Maternity">Maternity</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Films">Films</option>
                                        <option value="Event">Event</option>
                                        <option value="Commercial">Commercial</option>
                                    </select>
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm text-gray-400 mb-2">Title (Optional)</label>
                                    <input
                                        type="text"
                                        value={imageTitle}
                                        onChange={(e) => setImageTitle(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none"
                                        placeholder="Image Title"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm text-gray-400 mb-2">File</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:bg-[#b5952f]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading || !newImage}
                                    className="bg-[#D4AF37] text-black font-medium py-2.5 px-6 rounded-lg hover:bg-[#b5952f] disabled:opacity-50 transition-colors"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : 'Upload'}
                                </button>
                            </form>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {galleryItems?.map((item) => (
                                <div key={item.id} className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <p className="font-medium text-white">{item.category}</p>
                                        <p className="text-sm text-gray-300">{item.title}</p>
                                        <button
                                            onClick={() => handleDeleteGallery(item.id)}
                                            className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full text-white hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'blog' && (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-light mb-8">Blog Management</h2>

                        {/* Create Post Section */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <Plus size={20} className="text-[#D4AF37]" />
                                Create New Post
                            </h3>
                            <form onSubmit={handleCreatePost} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={blogTitle}
                                            onChange={(e) => setBlogTitle(e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Category</label>
                                        <input
                                            type="text"
                                            value={blogCategory}
                                            onChange={(e) => setBlogCategory(e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                    {/* New Fields */}
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={blogTags}
                                            onChange={(e) => setBlogTags(e.target.value)}
                                            placeholder="e.g. wedding, photography, candid"
                                            className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Keywords (SEO)</label>
                                        <input
                                            type="text"
                                            value={blogKeywords}
                                            onChange={(e) => setBlogKeywords(e.target.value)}
                                            placeholder="e.g. best wedding photographer coimbatore"
                                            className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Excerpt</label>
                                    <input
                                        type="text"
                                        value={blogExcerpt}
                                        onChange={(e) => setBlogExcerpt(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Content</label>
                                    <textarea
                                        value={blogContent}
                                        onChange={(e) => setBlogContent(e.target.value)}
                                        rows={6}
                                        className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-white focus:border-[#D4AF37] outline-none resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Cover Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setBlogImage(e.target.files?.[0] || null)}
                                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:bg-[#b5952f]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Additional Images</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => setBlogAdditionalImages(e.target.files)}
                                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:bg-[#b5952f]"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-[#D4AF37] text-black font-medium py-2.5 px-8 rounded-lg hover:bg-[#b5952f] disabled:opacity-50 transition-colors"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : 'Publish Post'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Blog List */}
                        <div className="space-y-4">
                            {blogPosts?.map((post) => (
                                <div key={post.id} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
                                    {post.image && (
                                        <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-md" />
                                    )}
                                    <div className="flex-1">
                                        <h4 className="text-xl font-medium text-white">{post.title}</h4>
                                        <p className="text-sm text-gray-400">{post.date} • {post.category}</p>
                                        <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
