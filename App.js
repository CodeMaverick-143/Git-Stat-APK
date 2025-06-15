import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGitHubData = async () => {
    if (!username.trim()) return alert('Enter a GitHub username!');

    const token = Constants.expoConfig?.extra?.GITHUB_TOKEN;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    const profileUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    const starsUrl = `https://api.github.com/search/repositories?q=user:${username}`;
    const pullsUrl = `https://api.github.com/search/issues?q=author:${username}+type:pr`;
    const eventsUrl = `https://api.github.com/users/${username}/events`;

    setLoading(true);
    setError('');
    setStats(null);
    setRepos([]);
    setUserProfile(null);

    try {
      const responses = await Promise.all([
        fetch(profileUrl, { headers }),
        fetch(reposUrl, { headers }),
        fetch(starsUrl, { headers }),
        fetch(pullsUrl, { headers }),
        fetch(eventsUrl, { headers }),
      ]);

      const [profileData, reposData, starsData, pullsData, eventsData] = await Promise.all(
        responses.map((res) => res.json())
      );

      const mergedPRs = pullsData.items.filter(
        (pr) => pr.pull_request && pr.pull_request.merged_at
      );

      setUserProfile(profileData);
      setStats({
        totalRepos: reposData.length,
        totalStars: starsData.total_count,
        totalPRs: pullsData.items.length,
        mergedPRs: mergedPRs.length,
      });

      setRepos(reposData);
    } catch (err) {
      console.error('GitHub Fetch Error:', err);
      setError('Failed to fetch GitHub data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>GitHub Stats Viewer</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter GitHub username"
        value={username}
        onChangeText={setUsername}
      />

      <Button title="Fetch GitHub Data" onPress={fetchGitHubData} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.marginTop} />}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      {userProfile && (
        <View style={styles.profileBox}>
          <Text style={styles.sectionTitle}>👤 GitHub Profile</Text>
          <Text>Name: {userProfile.name || 'N/A'}</Text>
          <Text>Username: {userProfile.login}</Text>
          <Text>Bio: {userProfile.bio || 'N/A'}</Text>
          <Text>Followers: {userProfile.followers}</Text>
          <Text>Following: {userProfile.following}</Text>
          <Text>Public Repos: {userProfile.public_repos}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(userProfile.html_url)}>
            <Text style={styles.link}>🔗 View on GitHub</Text>
          </TouchableOpacity>
        </View>
      )}

      {stats && (
        <View style={styles.statsBox}>
          <Text style={styles.sectionTitle}>📊 GitHub Stats</Text>
          <Text>Total Repositories: {stats.totalRepos}</Text>
          <Text>Total Stars: {stats.totalStars}</Text>
          <Text>Total PRs: {stats.totalPRs}</Text>
          <Text>Merged PRs: {stats.mergedPRs}</Text>
        </View>
      )}

      {repos.length > 0 && (
        <View style={styles.reposSection}>
          <Text style={styles.sectionTitle}>📦 Repositories</Text>
          {repos.map((repo, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(repo.html_url)}>
              <Text style={styles.repoLink}>{repo.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 12,
  },
  profileBox: {
    backgroundColor: '#cffafe', // cyan-100
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  statsBox: {
    backgroundColor: '#f3f4f6', // gray-100
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  link: {
    color: '#2563eb', // blue-600
    fontWeight: '600',
    marginTop: 8,
  },
  repoLink: {
    color: '#3b82f6', // blue-500
    marginVertical: 4,
  },
  reposSection: {
    marginTop: 16,
  },
});
