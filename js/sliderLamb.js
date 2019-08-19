(function(){
   function sliderLamb( options){
      this.options = options ;
      if( options.el && document.querySelector( options.el )  ){
           this.el =  document.querySelector( options.el )
      }
        
        this.initDom();
        this.initData();
        this.init();
  }
  
  sliderLamb.prototype.initDom = function (){
      
        // 设置默认slider 的样式
        Object.assign(this.el.style ,{
              position: 'relative',
              display:'inline-block',
              width:  this.options.sliderWidth? this.options.sliderWidth :'300px',
              height:this.options.sliderHeight? this.options.sliderHeight: '40px',
              background: this.options.background? this.options.background :'rgb(134, 134, 131)',
              color:this.options.color? this.options.color :'white'
        }) 
      
       // msg 
       this.msg =  document.createElement('p');
       this.msg.className ='msg';
       this.msg.innerText =  this.options.msg ? this.options.msg :'请滑动滑块，拖动到最右边';
      
      
      // inner-slider
      this.innerSlider = document.createElement('div');
      this.innerSlider.className = 'inner-slider';
      
      // sb 内部滑块
      this.sb = document.createElement('div');
      this.sb.className = 'sb sb_normal';
      
      
      this.innerSlider.appendChild( this.sb );
       
       this.el.appendChild( this.msg );
       this.el.appendChild( this.innerSlider );
      
  }
  sliderLamb.prototype.initData = function () {
       this.mouseDownPosX = null ;
       this.startFlag = false;
       this.isSucess =false;
       this.maxDis = this.el.clientWidth - this.sb.clientWidth;
  }
  
  sliderLamb.prototype.init = function () {
        var  _this = this ; // _this 就成了全局对象了！
        this.sb.addEventListener('mousedown',md)
        function md (e){
            if( _this.isSucess ) return ;
             e  = e || event ;
             _this.mouseDownPosX =   e.clientX;
             _this.startFlag = true ;
             _this.sb.style.transition ='';
             _this.innerSlider.style.transition ='';
             
             _this.el.addEventListener( 'mousemove',mm)
            document.addEventListener( 'mouseup', mu)
        }
      
        function mm (e){
            if( !_this.startFlag ) return ;
            e  = e || event ;
            var disX = e.clientX - _this.mouseDownPosX ;
            
            if( disX > _this.maxDis ){
                 return ;
            }
            if( disX < 0){
                 return   _this.sb.style.left = '0px';
            }
            
            _this.sb.style.left =  disX +'px';
            _this.innerSlider.style.width =   disX +'px';
       }
       
        function mu (e){
             _this.startFlag = false;
             var disX =   e.clientX - _this.mouseDownPosX ;
             _this.el.removeEventListener( 'mousemove',mm)
             document.removeEventListener( 'mouseup', mu)
            
            if(_this.isSucess) return ;
            if( disX < _this.maxDis && disX!=0 ){
               _this.sb.className ='sb sb_normal';
               _this.sb.style.transition ='2s all ease';
               _this.sb.style.left = '0px';
               
               _this.innerSlider.style.transition ='2s all ease';
              _this. innerSlider.style.width =   '0px';
               _this.isSucess = false ;
               _this.msg.innerHTML ='请滑动滑块，拖动到最右边';
            }
             
             if( disX  >= _this.maxDis ){
                 _this.isSucess = true ;
                 _this.sb.className ='sb sb_success';
                 _this.sb.style.left =  _this.maxDis+'px';
                 _this.innerSlider.style.width = _this.maxDis+'px';
                 _this.msg.innerHTML ='验证成功';
             }
             
       }
      
  }
  
  
  
  // 挂载到全局 
   self.sliderLamb = sliderLamb;  
})()