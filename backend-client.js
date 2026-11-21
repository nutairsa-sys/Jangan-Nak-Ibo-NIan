(function(){
  const cfg=window.JNI_BACKEND_CONFIG||{};
  const ready=cfg.supabaseUrl && cfg.supabaseAnonKey && !cfg.supabaseUrl.includes('PROJECT-ID') && !cfg.supabaseAnonKey.includes('PUBLIC_KEY') && window.supabase;
  window.jniBackend={
    ready:!!ready,
    client:ready?window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey):null,
    async createOrder(customer,items){
      if(!this.ready) throw new Error('Backend belum dikonfigurasi. Pesanan demo tidak disimpan ke server.');
      const payload=items.map(([id,quantity])=>({product_id:id,quantity}));
      const {data,error}=await this.client.rpc('jni_create_order',{p_customer_name:customer.name,p_customer_email:customer.email,p_customer_phone:customer.phone,p_customer_note:customer.note||'',p_items:payload});
      if(error) throw error;
      return data;
    },
    async createPayment(orderNo, accessToken){
      if(!this.ready) throw new Error('Backend belum dikonfigurasi.');
      const {data,error}=await this.client.functions.invoke('jni-create-payment',{body:{order_no:orderNo,access_token:accessToken}});
      if(error) throw error;
      if(data?.error) throw new Error(data.error);
      return data;
    },
    async requestDownloads(orderNo, accessToken){
      if(!this.ready) throw new Error('Backend belum dikonfigurasi.');
      const {data,error}=await this.client.functions.invoke('jni-download',{body:{order_no:orderNo,access_token:accessToken}});
      if(error) throw error;
      if(data?.error) throw new Error(data.error);
      return data.downloads||[];
    }
  };
})();
