/**
 * Problem: Single-Source Shortest Paths - Bellman Ford Algorithm
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>
#include <climits>

using namespace std;

struct Edge {
    int src, dest, weight;
};

class Solution {
public:
    void bellmanFord(int V, int E, vector<Edge>& edges, int src) {
        vector<int> dist(V, INT_MAX);
        dist[src] = 0;

        for (int i = 1; i <= V - 1; i++) {
            for (int j = 0; j < E; j++) {
                int u = edges[j].src;
                int v = edges[j].dest;
                int weight = edges[j].weight;
                if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }

        // Check for negative-weight cycles
        for (int j = 0; j < E; j++) {
            int u = edges[j].src;
            int v = edges[j].dest;
            int weight = edges[j].weight;
            if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                cout << "Graph contains negative weight cycle!" << endl;
                return;
            }
        }

        cout << "Vertex Distance from Source " << src << ":" << endl;
        for (int i = 0; i < V; i++) {
            cout << i << "\t\t" << dist[i] << endl;
        }
    }
};

int main() {
    Solution solver;
    int V = 5;
    int E = 8;
    vector<Edge> edges = {
        {0, 1, -1}, {0, 2, 4}, {1, 2, 3}, {1, 3, 2},
        {1, 4, 2}, {3, 2, 5}, {3, 1, 1}, {4, 3, -3}
    };
    solver.bellmanFord(V, E, edges, 0);
    return 0;
}
