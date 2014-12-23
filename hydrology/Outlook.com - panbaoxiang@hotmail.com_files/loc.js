/*! � Microsoft and/or Skype 2012 */
var SkyJS;if(!SkyJS){SkyJS={}}(function(a){SkyJS.namespace=function(b){var c,d=b.split("."),e=a;for(c=0;c<d.length;c+=1){e=e[d[c]]=e[d[c]]||{}}return e};SkyJS.extend=function(b,d){var c;
for(c in d){if(Object.prototype.hasOwnProperty.call(d,c)){b[c]=d[c]}}return b}}(window));
/*! � Microsoft and/or Skype 2012 */
SkyJS.namespace("SkyJS.Live.Rollout");(function(){var c=SkyJS.Live.Rollout,h,b,g,f,d,a,e;
c.isEnabled=function(o,j){var k,n,m,i;try{i=c.Data||SkyJS.Outlook.Rollout.Data||null;if(o&&j){k=c.getUserPercentPoint(o);n=e(j);
if(i){m=i[n];if(!m){m=i.ROW}if(m){return{is:m.current>0&&k<=m.current,was:m.maximum>0&&k<=m.maximum}}}}}catch(l){}return{is:false,was:false}
};c.getPackageUrl=function(p,i){var l,o,n,j,k;try{k=SkyJS.Live.Version.Data||null;if(p&&i&&k){l=c.getUserPercentPoint(p);o=e(i);
n=k[o];if(n&&l<=n.overridepercentage){j=k[o].version}else{j=k.DEFAULT.version
}return"https://az598575.vo.msecnd.net/"+j+"/assets/javascript/outlook-package.min.js?r=1"}}catch(m){}return null};c.getUserPercentPoint=function(j){var i=c.hashBytes(c.decToBytesInt64(j));return i/4294967295*100
};c.decToBytesInt64=function(i){return i.charAt(0)==="-"?d(a(f(i.slice(1)))):a(f(i))};c.hashBytes=function(i){return h(b(i))};c.hashString=function(i){return h(g(i))};h=function(j){var k=2654435769,i=2654435769,m=0,l;
l=function(){k=(k-i-m)^(m>>>13);i=(i-m-k)^(k<<8);m=(m-k-i)^(i>>>13);k=(k-i-m)^(m>>>12);i=(i-m-k)^(k<<16);m=(m-k-i)^(i>>>5);k=(k-i-m)^(m>>>3);i=(i-m-k)^(k<<10);m=(m-k-i)^(i>>>15)};while(j.bytes_left()>=12){k+=j.read_int();
i+=j.read_int();m+=j.read_int();l()}m+=j.total_bytes();k+=j.read_int();i+=j.read_int();m+=j.read_int()<<8;l();return m<0?m+4294967296:m};b=function(i){var j=0;return{read_int:function(){var k=0;if(j<i.length){k+=i[j]&255;
j+=1}if(j<i.length){k+=(i[j]&255)<<8;j+=1}if(j<i.length){k+=(i[j]&255)<<16;j+=1}if(j<i.length){k+=(i[j]&255)<<24;j+=1}return k},bytes_left:function(){return i.length-j},total_bytes:function(){return i.length
}}};g=function(i){var j=0;return{read_int:function(){var k=0;if(j<i.length){k+=i.charCodeAt(j);j+=1}if(j<i.length){k+=i.charCodeAt(j)<<16;j+=1}return k},bytes_left:function(){return 2*(i.length-j)},total_bytes:function(){return 2*i.length
}}};f=function(n){var m,l,k=[0],o;for(m=0;m<n.length;m+=1){o=+n.charAt(m);for(l=0;l<k.length;l+=1){k[l]=k[l]*10+o;o=k[l]>>8;k[l]&=255}while(o>0){k.push(o&255);o>>=8}}return k.reverse()};d=function(k){var l,m=1,j=a([]);
for(l=k.length-1;l>=0;l-=1){k[l]=(k[l]^255)+m;m=k[l]>>8;k[l]&=255}return k};a=function(j){var i=j.slice(-8);while(i.length<8){i.unshift(0)}return i};e=function(i){var j=i.match(/^[a-z]+-([a-z]+)$/i);return j?j[1].toUpperCase():i.toUpperCase()
}}());

SkyJS.namespace('SkyJS.Outlook.Rollout').Data = {
	"WO" : { "current": 100, "maximum": 100 },
	"ROW" : { "current": 100, "maximum": 100 }
};

SkyJS.namespace('SkyJS.Live.Version').Data = {
	"DEFAULT" : { "overridepercentage": 100, "version": '3-14-1802' },
	"WO" : { "overridepercentage": 100, "version": '3-14-1802' }
};

SkyJS.namespace('SkyJS.DynamicConfig').Data = { visitorSampling: 0.001 };
SkyJS.namespace('SkyJS.dynamicConfig').Data = { visitorSampling: 0.001 };