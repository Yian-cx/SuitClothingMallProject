import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BrowsingHistoryPage = () => {
  const navigation = useNavigation();

  const historyItems = [
    {
      id: 1,
      title: '别睡了',
      image: 'https://picsum.photos/300/300?random=1',
      author: '杭州鱼头欣欣',
      likes: 61,
    },
    {
      id: 2,
      title: '敢信这里属于西湖区嘛?',
      image: 'https://picsum.photos/300/300?random=2',
      author: '娜珍的农村生活',
      likes: 370,
    },
    {
      id: 3,
      title: 'Wechat 氛围感小众头像（鹿晗）',
      image: 'https://picsum.photos/300/300?random=3',
      author: '胖乐7（几过鹿晗）',
      likes: 4831,
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>浏览记录</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text>笔记</Text>
          <Text>直播</Text>
        </View>

        {historyItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          >
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 10, marginRight: 15 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
              <Text style={{ color: '#666', marginBottom: 5 }}>{item.author}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="heart-outline" size={16} color="#666" />
                <Text style={{ marginLeft: 5, color: '#666' }}>{item.likes}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default BrowsingHistoryPage;

