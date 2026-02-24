import { useStore } from "../store";
import { Check, Clock, DollarSign, ArrowUpRight } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, bg }: { title: string, value: string | number, icon: any, color: string, bg: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className={`p-4 rounded-xl ${bg} ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

export default function AdminDashboard() {
  const orders = useStore(state => state.orders);
  const updateStatus = useStore(state => state.updateOrderStatus);
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  
  return (
     <div className="space-y-8">
       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatCard 
           title="Total Revenue" 
           value={`$${totalRevenue.toFixed(2)}`} 
           icon={DollarSign} 
           color="text-green-600" 
           bg="bg-green-50" 
         />
         <StatCard 
           title="Pending Orders" 
           value={pendingOrders} 
           icon={Clock} 
           color="text-orange-600" 
           bg="bg-orange-50" 
         />
         <StatCard 
           title="Completed Orders" 
           value={completedOrders} 
           icon={Check} 
           color="text-blue-600" 
           bg="bg-blue-50" 
         />
       </div>
       
       {/* Orders Table */}
       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
           <div>
             <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
             <p className="text-sm text-gray-500 mt-1">Manage and track your customer orders</p>
           </div>
           <button className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
             View All <ArrowUpRight size={16} />
           </button>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Order ID</th>
                 <th className="px-6 py-4">Items</th>
                 <th className="px-6 py-4">Total</th>
                 <th className="px-6 py-4">Date</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {orders.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                     No orders found.
                   </td>
                 </tr>
               ) : (
                 orders.map(order => (
                   <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                     <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order.id}</td>
                     <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                       <div className="truncate" title={order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}>
                         {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                       </div>
                     </td>
                     <td className="px-6 py-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                     <td className="px-6 py-4 text-sm text-gray-500">
                       {new Date(order.createdAt).toLocaleDateString()}
                     </td>
                     <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                         order.status === 'Pending' 
                           ? 'bg-orange-50 text-orange-700 border-orange-200' 
                           : 'bg-green-50 text-green-700 border-green-200'
                       }`}>
                         <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                           order.status === 'Pending' ? 'bg-orange-500' : 'bg-green-500'
                         }`} />
                         {order.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                       {order.status === 'Pending' && (
                         <button 
                           onClick={() => updateStatus(order.id, 'Completed')} 
                           className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm shadow-green-200"
                         >
                           <Check size={14} />
                           Complete
                         </button>
                       )}
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
           </table>
         </div>
       </div>
     </div>
  );
}
