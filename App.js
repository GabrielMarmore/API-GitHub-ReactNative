import axios from 'axios'
import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native'

export default function App () {
  const baseURL = 'https://api.github.com/users/GabrielMarmore/repos'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadRepos()
  }, [])

  async function loadRepos () {
    if (loading) return;

    setLoading(true)

    const response = await axios.get(baseURL)
    setData([...data, ...response.data])
  }
  
  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.full_name}</Text>
    </View>
  );

  return (
    <FlatList
      style={{ marginTop: 30 }}
      contentContainerStyle={styles.list}
      data={data}
      renderItem={this.renderItem}
      keyExtractor={item => String(item.id)}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20
  },

  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 20
  }
})
